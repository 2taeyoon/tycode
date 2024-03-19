import React, { useEffect, useState } from "react";
import { SayingComponentProps, SayingProps } from "../../types/props";
import { sayings } from "../../data/sayingList";

export default function Saying({sessionName}: SayingComponentProps) {
  const [currentSaying, setCurrentSaying] = useState<SayingProps>(() => {
    const savedData = sessionStorage.getItem("saying"); // 'saying' 키에서 전체 데이터를 가져옴

    if (savedData) {
      const data = JSON.parse(savedData);
      // sessionName에 따라 해당 섹션의 데이터를 반환
      return data[sessionName] || getRandomSaying();
    } else {
      return getRandomSaying(); // 세션스토리지에 데이터가 없으면 랜덤 명언으로 설정
    }
  });

  // 랜덤 명언을 가져오는 함수
  function getRandomSaying() {
    const randomIndex = Math.floor(Math.random() * sayings.length);
    return sayings[randomIndex];
  }

  useEffect(() => {
    const savedData = sessionStorage.getItem("saying");
    const data = savedData ? JSON.parse(savedData) : {};

    // 현재 세션 이름에 해당하는 데이터를 업데이트
    data[sessionName] = currentSaying;

    sessionStorage.setItem("saying", JSON.stringify(data));
  }, [currentSaying, sessionName]);

  const handleRefreshClick = () => {
    setCurrentSaying(getRandomSaying());
  };

  return (
    <div className="saying_all_wrap">
      <div className="saying_wrap">
        <div className="saying">"{currentSaying.saying}"</div>
        <div className="writer_wrap">
          <div className="writer"><span>-</span>{currentSaying.writer}</div>
          <div className="job">{currentSaying.job}</div>
        </div>
        <div className="border"></div>
        <div className="reset_btn" onClick={handleRefreshClick}>
					<svg viewBox="0 0 120 120">
						<path d="M94.01,10.86c.15-.88-.24-1.42-.4-2.01-1.01-3.6,.83-7.19,4.33-8.4,3.4-1.18,7.3,.41,8.5,3.82,2.44,6.9,4.79,13.85,6.93,20.85,1.32,4.3-1.87,8.39-6.44,8.46-6.72,.11-13.44,.07-20.16,.01-3.39-.03-5.92-2.14-6.65-5.3-.7-3.03,.9-5.86,4.42-7.68-3.15-2.09-6.49-3.6-10-4.72C47.54,7.25,19.76,23.58,14.11,51.37c-5.15,25.37,12.56,50.9,38.08,54.88,24.79,3.87,47.38-11.19,53.25-35.49,.82-3.41,1.11-6.87,1.22-10.37,.15-4.92,4.58-8.01,8.98-6.39,2.72,1,4.4,3.47,4.36,6.56-.16,14.14-4.51,26.85-13.56,37.71-13.15,15.78-30.22,23.11-50.69,21.94C28.45,118.66,5.25,97.5,.83,70.5-4.25,39.47,14.47,10.24,44.75,2.32c16.93-4.43,32.89-1.71,47.74,7.56,.48,.3,.96,.61,1.52,.97Z"/>
						<circle cx="60" cy="60.2" r="17.22"/>
					</svg>
				</div>
      </div>
    </div>
  );
}
