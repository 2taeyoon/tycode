import React, { useState, useEffect } from "react";
import CommonHelmet from "../../components/utill/CommonHelmet";
import { useParams } from "react-router-dom";
import PublishingCard from "../../data/publishingPortfolioData.json";
import { CardProps } from "../../types/props";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight"
import rehypeRaw from "rehype-raw"
import PageUrls from "../../components/utill/PageUrls";
import Banner from "../../components/ui/Banner";

export default function PublishingPortfolioContent() {
	const { title } = useParams(); // 현재 하이픈이 적용된 URL 가져오기
  const hyphenRemoval = title?.replace(/-/g, " ") ?? ""; // 현재 하이픈이 적용된 URL의 하이픈 제거 후, 공백 추가

	// JSON 파일의 title과 현재 URL을 비교하여 해당하는 객체 가져오기 START!
  const PublishingCardFind = PublishingCard.cards.find(
    (item: CardProps) => item.title === hyphenRemoval
  );
	// JSON 파일의 title과 현재 URL을 비교하여 해당하는 객체 가져오기 END!

	//마크다운 파일을 랜더링 START!
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch(`${PublishingCardFind?.mdFile}`)
      .then((response) => response.text())
      .then((text) => setMarkdown(text));
  }, [PublishingCardFind?.mdFile, title]);
	//마크다운 파일을 랜더링 END!

  return (
    <>
			<CommonHelmet
        title={PublishingCardFind?.title}
        description={`퍼블리싱 포트폴리오입니다.`}
        ogTitle={PublishingCardFind?.title}
        ogDescription={`퍼블리싱 포트폴리오입니다.`}
        keywords={PublishingCardFind?.title}
				ogImage={`https://www.2taeyoon.com${PublishingCardFind?.image}`}
				ogURL={`https://www.2taeyoon.com/pp/${title}`}
      />
			<div className="common_wrap banner_wrap">
				{PublishingCardFind && <Banner CardFind={PublishingCardFind} />}
			</div>
      <div className="common_pf common_wrap">
        <div className="blog">
          <ReactMarkdown rehypePlugins={[rehypeHighlight, rehypeRaw]}>
            {markdown}
          </ReactMarkdown>
					<PageUrls hyphenRemoval={hyphenRemoval} cards={PublishingCard.cards} basePath="pp"/>
        </div>
      </div>
    </>
  );
}
