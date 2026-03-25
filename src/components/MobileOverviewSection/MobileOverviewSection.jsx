// src/components/MobileOverviewSection/MobileOverviewSection.jsx

import React, { useState, useEffect } from "react";
import styles from "./MobileOverviewSection.module.scss";

// 1) 모바일 메인 히어로 이미지
import heroImage from "../../assets/Main/heroImage.jpg";
// 2) 입지환경 지도
import mobileMap from "../../assets/LocationEnvironment/LocationEnvironment1/page1.jpg";
import mobileMap2 from "../../assets/LocationEnvironment/LocationEnvironment2/page2.jpg";
// 3) 프리미엄 슬라이드 이미지들
import slide1 from "../../assets/LocationEnvironment/LocationEnvironment1/session2-1.jpg";
import slide2 from "../../assets/LocationEnvironment/LocationEnvironment1/session2-2.jpg";
import slide3 from "../../assets/LocationEnvironment/LocationEnvironment1/session2-3.jpg";
import slide4 from "../../assets/LocationEnvironment/LocationEnvironment1/session2-4.jpg";
import slide5 from "../../assets/LocationEnvironment/LocationEnvironment1/session2-5.jpg";
import slide6 from "../../assets/LocationEnvironment/LocationEnvironment1/session2-6.jpg";

const items = [
  {
    key: "overview",
    label: "사업개요",
    content: (
      <ul className={styles.detailList}>
        <li>
          <strong>사업명</strong>
          <span>오산 센트럴시티 운암뜰</span>
        </li>
        <li>
          <strong>대지위치</strong>
          <span>
            경기도 오산시 오산동 운암뜰 도시개발지구 일원
          </span>
        </li>
        <li>
          <strong>건축규모</strong>
          <span>
            지하 4층 ~ 지상 49층 (예정)
          </span>
        </li>
        <li>
          <strong>주택형</strong>
          <span>
            전용 59㎡ / 84㎡ (예정)
          </span>
        </li>
        <li>
          <strong>세대수</strong>
          <span>
            총 1,000세대 내외 (예정)
          </span>
        </li>
      </ul>
    ),
  },
  
  {
    key: "location",
    label: "입지환경",
    content: (
      <div className={styles.mapGrid}>
        <img
          src={mobileMap}
          className={styles.mapImage}
          alt="입지환경 지도 1"
        />
        {/* <img
          src={mobileMap2}
          className={styles.mapImage}
          alt="입지환경 지도 2"
        /> */}
      </div>
    ),
  },
  {
    key: "premium",
    label: "프리미엄",
    content: (
      <>
        {/* 프리미엄 섹션 상단 문단 */}
        <div className={styles.premiumIntro}>
        <h3 className={styles.premiumTitle}>GREAT PREMIUM</h3>
        <p className={styles.premiumSubtitle}>
          오산의 중심에서 누리는<br />
          프리미엄 라이프의 완성
        </p>
        </div>
        {/* 슬라이더 */}
        <PremiumSlider />
      </>
    ),
  },
];

function PremiumSlider() {
  const slides = [
    {
      img: slide1,
      title: "오산 운암뜰 스마트시티의 중심 가치",
      desc:
        "미래도시 운암뜰 중심 입지의 프리미엄 라이프 <br /> 높은 미래가치와 함께하는 새로운 주거 기준",
    },
    {
      img: slide2,
      title: "센트럴시티 운암뜰만의 특화설계",
      desc:
        "실거주 만족도를 높인 혁신 평면 구성 <br /> 라이프스타일을 고려한 효율적인 공간 설계",
    },
    {
      img: slide3,
      title: "광역으로 연결되는 편리한 교통환경",
      desc:
        "오산 주요 도로망과 인접한 편리한 교통 <br /> 수도권으로 이어지는 쾌적한 이동 환경",
    },
    {
      img: slide4,
      title: "교육·쇼핑·문화가 가까운 생활 인프라",
      desc:
        "생활 인프라를 가까이 누리는 프리미엄 라이프 <br /> 편리함이 완성된 스마트시티 생활",
    },
    {
      img: slide5,
      title: "품격을 높이는 다양한 커뮤니티",
      desc:
        "입주민 만족도를 높이는 다양한 커뮤니티 시설 <br /> 생활의 품격을 더하는 프리미엄 주거",
    },
    {
      img: slide6,
      title: "미래가치와 프리미엄을 동시에",
      desc:
        "운암뜰 도시개발의 미래가치 <br /> 오산의 새로운 중심으로 기대되는 주거 단지",
    },
  ];
  
  const [current, setCurrent] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  const nextSlide = () =>
    setCurrent((c) => (c + 1 + slides.length) % slides.length);
  const prevSlide = () =>
    setCurrent((c) => (c - 1 + slides.length) % slides.length);

  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
  const handleTouchMove = (e) => setTouchEndX(e.touches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStartX == null || touchEndX == null) return;
    const dist = touchStartX - touchEndX;
    if (dist > 50) nextSlide();
    else if (dist < -50) prevSlide();
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <div
      className={styles.premiumSlider}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.slide}>
        <img src={slides[current].img} alt="" />
        <div className={styles.caption}>
          <h4
            dangerouslySetInnerHTML={{ __html: slides[current].title.replace(/\n/g, "<br/>") }}
          />
          <p
            dangerouslySetInnerHTML={{ __html: slides[current].desc }}
          />
        </div>
      </div>
      <div className={styles.dots}>
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={idx === current ? styles.dotActive : styles.dot}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
}

export default function MobileOverviewSection() {
  const [openKey, setOpenKey] = useState(null);
  const toggle = (key) => setOpenKey(openKey === key ? null : key);

  return (
    <section className={styles.overviewSection}>
      {/* ─── 헤더 영역 ─── */}
      <header className={styles.overviewHeader}>
        <div className={styles.preTitle}>BUSINESS</div>
        <div className={styles.line} />
        <h2 className={styles.mainTitle}>사업안내</h2>
      </header>

      {/* ─── 히어로 이미지 ─── */}
      <img src={heroImage} className={styles.heroImage} alt="오산 센트럴시티 운암뜰 섹션이미지1 " />

      {/* ─── 아코디언 항목 ─── */}
      {items.map(({ key, label, content }) => (
        <div key={key} className={styles.accordionItem}>
          <button
            className={`${styles.accordionHeader} ${openKey === key ? styles.active : ""}`}
            onClick={() => toggle(key)}
          >
            <span className={styles.label}>{label}</span>
            <span className={`${styles.arrow} ${openKey === key ? styles.up : styles.down}`} />
          </button>
          {openKey === key && <div className={styles.accordionContent}>{content}</div>}
        </div>
      ))}
    </section>
  );
}
