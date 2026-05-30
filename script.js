const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav a");
const scrollProgress = document.getElementById("scrollProgress");
const knowledgePercent = document.getElementById("knowledgePercent");
const cursorGlow = document.getElementById("cursorGlow");
const visualStage = document.getElementById("visualStage");
const logoObject = document.getElementById("logoObject");
const topButton = document.getElementById("topButton");

const processSteps = document.querySelectorAll(".process-step");
const processDetail = document.getElementById("processDetail");

const checklistGroups = document.getElementById("checklistGroups");
const progressCircle = document.getElementById("progressCircle");
const progressPercent = document.getElementById("progressPercent");
const progressText = document.getElementById("progressText");
const resetChecklist = document.getElementById("resetChecklist");

const copyButton = document.getElementById("copyButton");
const copyText = document.getElementById("copyText");

let targetRotateX = 0;
let targetRotateY = 0;
let currentRotateX = 0;
let currentRotateY = 0;
let targetScale = 1;
let currentScale = 1;

const checklistData = [
  {
    title: "프로젝트 시작 전",
    items: [
      "프로젝트 목적과 최종 산출물을 확인했나요?",
      "타깃 사용자와 브랜드 톤앤매너를 확인했나요?",
      "참고 레퍼런스와 피해야 할 레퍼런스를 구분했나요?",
      "클라이언트의 최종 의사결정권자가 누구인지 확인했나요?",
      "필요한 원고, 이미지, 로고, 브랜드 자료를 받았나요?"
    ]
  },
  {
    title: "계약과 비용",
    items: [
      "작업 범위와 제외 범위를 문서로 남겼나요?",
      "견적서에 포함 항목과 미포함 항목을 구분했나요?",
      "계약금, 중도금, 잔금 지급 시점을 정했나요?",
      "추가 업무 발생 시 비용 산정 기준을 정했나요?",
      "계약 취소 또는 일정 지연 시 기준을 정했나요?"
    ]
  },
  {
    title: "일정과 피드백",
    items: [
      "전체 일정과 주요 마감일을 공유했나요?",
      "피드백 마감일과 회신 방식을 정했나요?",
      "수정 횟수와 수정 범위를 명확히 했나요?",
      "수정 요청은 구두가 아닌 문서나 메시지로 받기로 했나요?",
      "피드백 지연 시 전체 일정이 밀릴 수 있음을 안내했나요?"
    ]
  },
  {
    title: "저작권과 사용 범위",
    items: [
      "저작권과 사용권의 차이를 설명했나요?",
      "디자인 사용 범위와 기간을 정했나요?",
      "원본 파일 제공 여부를 정했나요?",
      "포트폴리오 공개 가능 여부를 확인했나요?",
      "외부 이미지, 폰트, 아이콘의 라이선스를 확인했나요?"
    ]
  },
  {
    title: "실무 커뮤니케이션",
    items: [
      "주요 소통 채널을 하나로 정했나요?",
      "회의 내용과 결정 사항을 기록으로 남겼나요?",
      "무리한 추가 요청에 선을 그을 문장을 준비했나요?",
      "긴급 요청의 기준과 추가 비용 여부를 안내했나요?",
      "친절과 무상 노동의 경계를 구분하고 있나요?"
    ]
  },
  {
    title: "납품과 종료",
    items: [
      "최종 산출물 파일 형식을 확인했나요?",
      "납품 전 오탈자와 이미지 해상도를 검수했나요?",
      "최종 승인 메시지를 기록으로 남겼나요?",
      "잔금 입금 여부를 확인했나요?",
      "프로젝트 종료 후 파일 백업과 정리를 완료했나요?"
    ]
  }
];

function renderChecklist() {
  checklistGroups.innerHTML = "";

  checklistData.forEach((group, groupIndex) => {
    const article = document.createElement("article");
    article.className = "check-group reveal";

    const title = document.createElement("h3");
    title.textContent = group.title;

    article.appendChild(title);

    group.items.forEach((item, itemIndex) => {
      const id = `check-${groupIndex + 1}-${itemIndex + 1}`;

      const label = document.createElement("label");
      label.className = "check-item";

      label.innerHTML = `
        <input type="checkbox" id="${id}" />
        <span>${item}</span>
      `;

      article.appendChild(label);
    });

    checklistGroups.appendChild(article);
  });
}

renderChecklist();

const checkboxes = document.querySelectorAll(".check-item input");

menuButton.addEventListener("click", () => {
  nav.classList.toggle("open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

window.addEventListener("scroll", () => {
  updateScrollProgress();
  updateKnowledgeColor();
  updateActiveNav();
  updateTopButton();
});

window.addEventListener("mousemove", (event) => {
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

function getScrollRatio() {
  const scrollTop = window.scrollY;
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

  if (documentHeight <= 0) {
    return 0;
  }

  return Math.min(scrollTop / documentHeight, 1);
}

function updateScrollProgress() {
  const ratio = getScrollRatio();
  scrollProgress.style.width = `${ratio * 100}%`;
}

function updateKnowledgeColor() {
  const ratio = getScrollRatio();
  const eased = Math.pow(ratio, 0.82);

  const alpha = 0.04 + eased * 0.72;
  const soft = 0.06 + eased * 0.42;
  const mid = 0.08 + eased * 0.52;
  const deep = 0.12 + eased * 0.64;

  document.documentElement.style.setProperty("--knowledge-alpha", alpha.toFixed(3));
  document.documentElement.style.setProperty("--knowledge-soft", soft.toFixed(3));
  document.documentElement.style.setProperty("--knowledge-mid", mid.toFixed(3));
  document.documentElement.style.setProperty("--knowledge-deep", deep.toFixed(3));

  knowledgePercent.textContent = `${Math.round(ratio * 100)}%`;
}

function updateActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  let currentId = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 180;

    if (window.scrollY >= sectionTop) {
      currentId = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentId}`) {
      link.classList.add("active");
    }
  });
}

function updateTopButton() {
  if (window.scrollY > 700) {
    topButton.classList.add("show");
  } else {
    topButton.classList.remove("show");
  }
}

topButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

visualStage.addEventListener("mousemove", (event) => {
  const rect = visualStage.getBoundingClientRect();

  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const percentX = (x - centerX) / centerX;
  const percentY = (y - centerY) / centerY;

  targetRotateY = percentX * 24;
  targetRotateX = -percentY * 24;
  targetScale = 1.045;

  const shineX = 50 + percentX * 24;
  const shineY = 36 + percentY * 18;

  logoObject.style.setProperty("--shine-x", `${shineX}%`);
  logoObject.style.setProperty("--shine-y", `${shineY}%`);
});

visualStage.addEventListener("mouseleave", () => {
  targetRotateX = 0;
  targetRotateY = 0;
  targetScale = 1;

  logoObject.style.setProperty("--shine-x", "35%");
  logoObject.style.setProperty("--shine-y", "24%");
});

function animateLogo() {
  currentRotateX += (targetRotateX - currentRotateX) * 0.08;
  currentRotateY += (targetRotateY - currentRotateY) * 0.08;
  currentScale += (targetScale - currentScale) * 0.08;

  const time = Date.now() * 0.001;
  const idleX = Math.cos(time * 0.55) * 4;
  const idleY = Math.sin(time * 0.5) * 5;
  const idleZ = Math.sin(time * 0.8) * 3;

  logoObject.style.transform = `
    rotateX(${currentRotateX + idleX}deg)
    rotateY(${currentRotateY + idleY}deg)
    rotateZ(${idleZ}deg)
    scale(${currentScale})
  `;

  requestAnimationFrame(animateLogo);
}

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.16
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

processSteps.forEach((step) => {
  step.addEventListener("click", () => {
    processSteps.forEach((item) => item.classList.remove("active"));
    step.classList.add("active");

    const title = step.dataset.title;
    const body = step.dataset.body;

    processDetail.innerHTML = `
      <p>현재 단계</p>
      <h3>${title}</h3>
      <span>${body}</span>
    `;
  });
});

checkboxes.forEach((checkbox) => {
  const savedValue = localStorage.getItem(checkbox.id);

  if (savedValue === "true") {
    checkbox.checked = true;
    checkbox.closest(".check-item").classList.add("done");
  }

  checkbox.addEventListener("change", () => {
    localStorage.setItem(checkbox.id, checkbox.checked);

    if (checkbox.checked) {
      checkbox.closest(".check-item").classList.add("done");
    } else {
      checkbox.closest(".check-item").classList.remove("done");
    }

    updateChecklistProgress();
  });
});

function updateChecklistProgress() {
  const total = checkboxes.length;
  const checked = Array.from(checkboxes).filter((checkbox) => checkbox.checked).length;
  const percent = total > 0 ? Math.round((checked / total) * 100) : 0;
  const degree = Math.round((percent / 100) * 360);

  progressCircle.style.setProperty("--progress", `${degree}deg`);
  progressPercent.textContent = `${percent}%`;

  if (checked === 0) {
    progressText.textContent = "아직 체크한 항목이 없습니다.";
  } else if (checked < total) {
    progressText.textContent = `${total}개 중 ${checked}개를 완료했습니다. 지식이 조금씩 쌓이고 있어요.`;
  } else {
    progressText.textContent = "모든 항목을 완료했습니다. 이제 더 안전하게 프로젝트를 시작할 수 있습니다.";
  }
}

resetChecklist.addEventListener("click", () => {
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
    checkbox.closest(".check-item").classList.remove("done");
    localStorage.removeItem(checkbox.id);
  });

  updateChecklistProgress();
});

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(copyText.textContent.trim());
    copyButton.textContent = "복사 완료!";
  } catch (error) {
    copyButton.textContent = "복사 실패";
  }

  setTimeout(() => {
    copyButton.textContent = "대화문 복사하기";
  }, 1600);
});

updateScrollProgress();
updateKnowledgeColor();
updateActiveNav();
updateTopButton();
updateChecklistProgress();
animateLogo();