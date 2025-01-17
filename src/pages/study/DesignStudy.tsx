import React, { useEffect, useState } from "react";
import CommonHelmet from "../../components/utill/CommonHelmet";
import DesignStudyCard from "../../data/designStudyData.json";
import SliderFade from "../../components/ui/SliderFade";
import { CardProps } from "../../types/props";
import Hashs from "../../components/utill/Hashs";
import Saying from "../../components/ui/Saying";
import CardPagination from "../../components/utill/CardPagination";

export default function DesignStudy() {
  const [selectedHash, setSelectedHash] = useState<string | null>(null); // 해시태그를 상태로 관리
  const [filteredCards, setFilteredCards] = useState<CardProps[]>([]); // 필터링 카드를 상태로 관리
	const [currentPage, setCurrentPage] = useState(0);

	// 선택된 해시태그에 따라 카드를 필터링하는 함수 START!
  useEffect(() => {
    if (selectedHash) { // 카드 중 해시태그가 일치하는 카드만 필터링합니다.
      const newFilteredCards = DesignStudyCard.cards.filter(card =>
        card.hashs.some(hash => hash.name === selectedHash)
      );
      setFilteredCards(newFilteredCards);
    } else { // 선택된 해시태그가 없다면 모든 카드를 표시
      setFilteredCards(DesignStudyCard.cards);
    }
  }, [selectedHash])

	// 카드에서 중복되지 않은 해시태그들만 추출하여 배열로 생성
	const uniqueHashs = Array.from(new Set(DesignStudyCard.cards.flatMap(card => card.hashs.map(hash => hash.name))));

  return (
    <>
      <CommonHelmet
        title="디자인 스터디"
        description="디자인 스터디"
        ogTitle="디자인 스터디"
        ogDescription="디자인 스터디"
        keywords="2taeyoon,이태윤,포트폴리오,디자인 스터디"
				ogImage="https://www.2taeyoon.com/favicon/favicon-512x512.png"
				ogURL="https://www.2taeyoon.com/ds"
      />
			<SliderFade typingText="디자인 스터디" typingText2="관련 내용을 공부하고 기록한 페이지입니다."/>
			<div className="common_wrap pd_none_col">
				<Saying sessionName="DesignStudy"/>
				<Hashs selectedHash={selectedHash} setSelectedHash={setSelectedHash} uniqueHashs={uniqueHashs} sessionName="DesignStudyHashs" setCurrentPage={setCurrentPage}/>
			</div>
			<div className="common_wrap">
				<CardPagination filteredCards={filteredCards} sessionName="DesignStudyHashs" currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      </div>
    </>
  );
}
