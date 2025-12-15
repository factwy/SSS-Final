import QuizTemplate from './QuizTemplate'; // 위에서 만든 파일 경로

// --- 데이터 셋 (PDF 내용 파싱) ---
const quizData = [
  // Part 1
  {
    id: 1,
    category: "Part 1: 개요 및 기본 개념",
    question: "멜트다운과 스펙터 공격이 공통적으로 악용하는 것은 무엇입니까?",
    options: [
      "a) 소프트웨어의 버퍼 오버플로우 취약점",
      "b) 오래된 프로세서의 물리적 결함",
      "c) 현대 프로세서의 성능 최적화 기능 (비순차 실행 및 추측 실행)",
      "d) 운영체제의 파일 시스템 권한 오류"
    ],
    answer: 2, // 0-based index for 'c'
    explanation: "두 공격 모두 CPU 성능 향상을 위한 비순차(Out-of-Order) 및 추측 실행(Speculative Execution) 기능을 악용합니다."
  },
  {
    id: 2,
    category: "Part 1: 개요 및 기본 개념",
    question: "이 공격들이 기존 공격과 다른 점은 무엇입니까?",
    options: [
      "a) 네트워크를 통해서만 수행된다.",
      "b) 전통적인 의미의 소프트웨어 취약점을 이용하지 않는다.",
      "c) 암호화 알고리즘 자체를 해독한다.",
      "d) 관리자 권한이 반드시 필요하다."
    ],
    answer: 1,
    explanation: "소프트웨어의 버그가 아닌 하드웨어의 설계적 특성을 악용한다는 점이 기존 공격과 다릅니다."
  },
  {
    id: 3,
    category: "Part 1: 개요 및 기본 개념",
    question: "다음 중 메모리 계층 구조에서 접근 속도가 가장 빠른 것은 무엇입니까?",
    options: ["a) L1 Cache", "b) L2 Cache", "c) Physical Memory (DRAM)", "d) Hard Disk"],
    answer: 0,
    explanation: "L1 캐시가 CPU 코어에 가장 가까워 접근 속도가 가장 빠릅니다 (<1 사이클)."
  },
  {
    id: 4,
    category: "Part 1: 개요 및 기본 개념",
    question: "CPU 코어들이 공통으로 공유하는 캐시(LLC)는 보통 무엇입니까?",
    options: ["a) L1 Cache", "b) L2 Cache", "c) L3 Cache", "d) Register"],
    answer: 2,
    explanation: "L3 캐시(Last Level Cache)는 보통 프로세서 내의 모든 코어가 공유합니다."
  },
  {
    id: 5,
    category: "Part 1: 개요 및 기본 개념",
    question: "멜트다운 공격이 주로 악용하는 프로세서의 핵심 기능은 무엇입니까?",
    options: ["a) 분기 예측 (Branch Prediction)", "b) 비순차 실행 (Out-of-order execution)", "c) 가상화 기술 (Virtualization)", "d) 멀티스레딩 (Multithreading)"],
    answer: 1,
    explanation: "멜트다운은 비순차 실행(Out-of-order) 과정에서 권한 검사 예외 처리가 지연되는 점을 악용합니다."
  },
  {
    id: 6,
    category: "Part 1: 개요 및 기본 개념",
    question: "스펙터 공격이 주로 악용하는 프로세서의 핵심 기능은 무엇입니까?",
    options: ["a) 비순차 실행 (Out-of-order execution)", "b) 추측 실행 (Speculative execution)", "c) 페이지 테이블 격리 (Page Table Isolation)", "d) 인터럽트 처리 (Interrupt Handling)"],
    answer: 1,
    explanation: "스펙터는 분기 예측을 속여 CPU가 잘못된 경로를 추측 실행(Speculative execution)하도록 유도합니다."
  },
  {
    id: 7,
    category: "Part 1: 개요 및 기본 개념",
    question: "캐시 기반 부채널 공격에서 특정 메모리 라인을 캐시에서 제거하기 위해 사용하는 명령어는?",
    options: ["a) mov", "b) jmp", "c) clflush", "d) rdtscp"],
    answer: 2,
    explanation: "clflush는 Cache Line Flush 명령어로, 특정 주소의 데이터를 캐시에서 제거합니다."
  },
  {
    id: 8,
    category: "Part 1: 개요 및 기본 개념",
    question: "멜트다운과 스펙터 공격을 막기 위해 해당 하드웨어 기능을 끄는 것이 어려운 이유는?",
    options: [
      "a) 끄는 기능이 아예 없어서",
      "b) 전력 소모가 급증해서",
      "c) 해당 기능이 현대 프로세서 성능의 필수적인 부분이기 때문에",
      "d) 운영체제가 부팅되지 않아서"
    ],
    answer: 2,
    explanation: "비순차 실행과 추측 실행은 현대 프로세서의 고성능을 유지하기 위해 필수적인 기능이므로 비활성화하기 어렵습니다."
  },
  {
    id: 9,
    category: "Part 1: 개요 및 기본 개념",
    question: "공격자가 타이밍 채널의 송신과 수신 양쪽을 모두 제어하여 정보를 전송하는 것을 무엇이라 합니까?",
    options: ["a) Side channel", "b) Covert channel (은닉 채널)", "c) Encrypted channel", "d) Public channel"],
    answer: 1,
    explanation: "보안 정책을 우회하여 정보를 전달하기 위해 송신자와 수신자가 협력하여(타이밍 등을 조절하여) 정보를 주고받는 채널을 은닉 채널(Covert channel)이라 합니다."
  },
  {
    id: 10,
    category: "Part 1: 개요 및 기본 개념",
    question: "페이지 테이블(Page Table)의 주된 역할은 무엇입니까?",
    options: ["a) 바이러스 검사", "b) 가상 주소를 물리 주소로 변환", "c) 캐시 메모리 초기화", "d) 디스크 파일 압축"],
    answer: 1,
    explanation: "페이지 테이블은 가상 주소를 실제 물리 메모리 주소로 매핑(변환)해주는 역할을 합니다."
  },
  // Part 2
  {
    id: 11,
    category: "Part 2: 멜트다운(Meltdown) 공격 메커니즘",
    question: "사용자 공간(User space) 프로세스가 커널 메모리에 직접 접근하려 하면 하드웨어는 어떻게 반응합니까?",
    options: ["a) 자동으로 권한을 부여한다.", "b) 예외(Exception)를 발생시킨다.", "c) 0을 반환한다.", "d) 시스템을 재부팅한다."],
    answer: 1,
    explanation: "사용자 권한에서 커널 메모리에 접근하면 권한 위반으로 하드웨어 예외(Exception/Fault)가 발생합니다."
  },
  {
    id: 12,
    category: "Part 2: 멜트다운(Meltdown) 공격 메커니즘",
    question: "멜트다운 공격에서 예외가 발생하기 전에 미리 실행되어 캐시 상태를 변화시키는 명령어들을 무엇이라 부릅니까?",
    options: ["a) Static Instructions", "b) Transient Instructions (일시적/과도기적 명령어)", "c) System Calls", "d) Privileged Instructions"],
    answer: 1,
    explanation: "Transient Instructions는 실행은 되었으나 예외 발생 등으로 인해 결과가 아키텍처에 커밋되지 않고 사라지는 명령어를 뜻하며, 이 과정에서 캐시 상태는 변화시킵니다."
  },
  {
    id: 13,
    category: "Part 2: 멜트다운(Meltdown) 공격 메커니즘",
    question: "멜트다운 공격의 'Probe Array'에서 각 항목을 서로 다른 캐시 라인에 위치시키기 위해 보통 얼마의 간격을 둡니까?",
    options: ["a) 64 bytes", "b) 128 bytes", "c) 1 KB", "d) 4 KB (Page size)"],
    answer: 3,
    explanation: "4KB는 페이지 크기로, 공간 지역성에 의한 하드웨어 프리페치(Prefetch)를 방지하고 확실히 서로 다른 캐시 라인을 사용하기 위해 4KB 간격을 둡니다."
  },
  {
    id: 14,
    category: "Part 2: 멜트다운(Meltdown) 공격 메커니즘",
    question: "멜트다운 코드 mov al, byte [rcx] 에서 rcx 가 가리키는 곳은 어디입니까?",
    options: ["a) 공격자의 힙 메모리", "b) 타겟 커널 메모리 주소 (비밀 값)", "c) 스택 포인터", "d) Probe Array의 시작 주소"],
    answer: 1,
    explanation: "rcx 레지스터에는 공격자가 읽고 싶어 하는 타겟 커널 메모리의 주소가 들어있습니다."
  },
  {
    id: 15,
    category: "Part 2: 멜트다운(Meltdown) 공격 메커니즘",
    question: "멜트다운 공격에서 비밀 값(1바이트)을 전송하기 위해 필요한 Probe Array의 크기는?",
    options: ["a) 64개 항목", "b) 128개 항목", "c) 256개 항목", "d) 1024개 항목"],
    answer: 2,
    explanation: "1바이트는 0부터 255까지 256가지 값을 가지므로, 각 값에 대응하는 256개의 슬롯(페이지)이 필요합니다."
  },
  {
    id: 16,
    category: "Part 2: 멜트다운(Meltdown) 공격 메커니즘",
    question: "멜트다운 공격자가 비밀 값을 알아내기 위해 사용하는 마지막 단계는 무엇입니까?",
    options: ["a) 커널 메모리 덤프", "b) Probe Array에 대한 접근 시간 측정 (Flush+Reload)", "c) 레지스터 값 출력", "d) 예외 처리 핸들러 등록"],
    answer: 1,
    explanation: "Flush+Reload 기법을 사용하여 Probe Array의 각 인덱스에 접근하는 시간을 측정합니다. 캐시 히트가 발생한 인덱스가 곧 비밀 값입니다."
  },
  {
    id: 17,
    category: "Part 2: 멜트다운(Meltdown) 공격 메커니즘",
    question: "멜트다운 공격이 성공하기 위해 공격자는 무엇과 경쟁(Race Condition)해야 합니까?",
    options: [
      "a) 다른 사용자 프로세스",
      "b) 백신 프로그램",
      "c) 예외 처리(Exception handling)가 발생하기 전 과도기적 명령어의 실행",
      "d) 네트워크 패킷 전송 속도"
    ],
    answer: 2,
    explanation: "예외가 처리되어 프로세스가 중단되거나 롤백되기 전에, 비밀 값을 로드하고 캐시를 조작하는 과정이 완료되어야 하므로 레이스 컨디션이 필요합니다."
  },
  {
    id: 18,
    category: "Part 2: 멜트다운(Meltdown) 공격 메커니즘",
    question: "인텔 CPU에서 비순차 실행을 구현하기 위해 사용되는 알고리즘은?",
    options: ["a) Dijkstra's algorithm", "b) Tomasulo's algorithm", "c) Banker's algorithm", "d) RSA algorithm"],
    answer: 1,
    explanation: "Tomasulo 알고리즘은 하드웨어 수준에서 비순차 실행(Out-of-order execution)을 구현하는 대표적인 알고리즘입니다."
  },
  {
    id: 19,
    category: "Part 2: 멜트다운(Meltdown) 공격 메커니즘",
    question: "멜트다운 취약점은 주로 어느 제조사의 프로세서에 영향을 줍니까?",
    options: ["a) Intel", "b) AMD", "c) 모든 프로세서 동일", "d) SPARC"],
    answer: 0,
    explanation: "멜트다운은 비순차 실행 시 권한 검사를 지연시키는 특정 마이크로아키텍처 구현을 악용하며, 주로 인텔 프로세서에 영향을 줍니다."
  },
  {
    id: 20,
    category: "Part 2: 멜트다운(Meltdown) 공격 메커니즘",
    question: "멜트다운 방어를 위한 소프트웨어 패치인 KPTI의 약자는 무엇입니까?",
    options: ["a) Kernel Page Table Isolation", "b) Key Protection Technology Intel", "c) Kernel Process Time Interruption", "d) Known Processor Threat Intelligence"],
    answer: 0,
    explanation: "KPTI(Kernel Page Table Isolation)는 커널 페이지 테이블을 사용자 공간과 격리하여 멜트다운을 방지하는 기법입니다."
  },
  // Part 3
  {
    id: 21,
    category: "Part 3: 스펙터(Spectre) 공격 메커니즘",
    question: "스펙터 공격은 어떤 프로세서 제조사에 영향을 미칩니까?",
    options: ["a) Intel만 해당", "b) AMD만 해당", "c) Intel, AMD, ARM 등 다양한 프로세서", "d) ARM만 해당"],
    answer: 2,
    explanation: "스펙터는 분기 예측 기능을 사용하는 대부분의 고성능 프로세서(Intel, AMD, ARM 등)에 광범위하게 영향을 줍니다."
  },
  {
    id: 22,
    category: "Part 3: 스펙터(Spectre) 공격 메커니즘",
    question: "스펙터 공격을 수행하기 위해 '호스트' 프로그램 내에 필요한 코드 조각을 무엇이라 합니까?",
    options: ["a) Widget", "b) Gadget", "c) Script", "d) Bug"],
    answer: 1,
    explanation: "공격자가 원하는 부채널 효과를 일으키기 위해 이용하는, 피해자 프로그램 내의 특정 명령어 시퀀스를 가젯(Gadget)이라 합니다."
  },
  {
    id: 23,
    category: "Part 3: 스펙터(Spectre) 공격 메커니즘",
    question: "스펙터 공격의 준비 단계(Preparation)에서 공격자가 하는 행동은?",
    options: [
      "a) 분기 예측기(Branch Predictor)를 특정 방향으로 훈련시킨다.",
      "b) 캐시를 비활성화한다.",
      "c) 관리자 권한을 획득한다.",
      "d) 커널 드라이버를 설치한다."
    ],
    answer: 0,
    explanation: "공격자는 분기 예측기(Branch Predictor)를 속이기 위해 특정 분기문을 반복 실행하여 예측기가 잘못된 예측을 하도록 훈련시킵니다."
  },
  {
    id: 24,
    category: "Part 3: 스펙터(Spectre) 공격 메커니즘",
    question: "스펙터 예제 코드 if (x < array1_size) 에서 x의 값이 array1_size 보다 클 때 발생하는 일은? (공격 시나리오상)",
    options: [
      "a) 프로그램이 즉시 종료된다.",
      "b) 분기 예측에 의해 if 문 내부 코드가 추측 실행된다.",
      "c) 운영체제에 의해 차단된다.",
      "d) 아무 일도 일어나지 않는다."
    ],
    answer: 1,
    explanation: "조건(x < array1_size)이 거짓이라도 예측기가 참으로 예측하면, CPU는 if 문 내부 코드를 추측 실행합니다."
  },
  {
    id: 25,
    category: "Part 3: 스펙터(Spectre) 공격 메커니즘",
    question: "스펙터 공격에서 추측 실행된 결과가 캐시에 흔적을 남긴 후, CPU가 예측 실패를 감지하면 어떻게 됩니까?",
    options: [
      "a) 캐시 내용도 원상 복구된다.",
      "b) 시스템이 다운된다.",
      "c) 아키텍처 상태는 되돌려지지만, 캐시 상태 변경은 남아있다.",
      "d) 비밀 값이 화면에 출력된다."
    ],
    answer: 2,
    explanation: "예측 실패가 감지되면 레지스터 등의 아키텍처 상태는 되돌려지지만, 이미 로드된 데이터로 인해 변경된 캐시 상태는 복구되지 않고 남습니다."
  },
  {
    id: 26,
    category: "Part 3: 스펙터(Spectre) 공격 메커니즘",
    question: "스펙터 공격이 멜트다운보다 해결하기 어려운 이유는?",
    options: [
      "a) 하드웨어 결함이 아니어서",
      "b) 공격 코드가 너무 간단해서",
      "c) 패치가 불가능해서",
      "d) 특정 호스트 프로그램의 가젯을 이용하며 광범위한 프로세서에 영향을 주기 때문에"
    ],
    answer: 3,
    explanation: "스펙터는 특정 프로그램의 코드 패턴(가젯)과 프로세서의 기본 동작 원리를 이용하므로, 하드웨어 수정이 매우 어렵고 소프트웨어 패치도 까다롭습니다."
  },
  {
    id: 27,
    category: "Part 3: 스펙터(Spectre) 공격 메커니즘",
    question: "구글 크롬 브라우저의 샌드박스를 우회하는 스펙터 기반 공격의 이름은?",
    options: ["a) Meltdown.js", "b) Spook.js", "c) ChromeHack", "d) SandboxBreaker"],
    answer: 1,
    explanation: "Spook.js는 브라우저의 샌드박스 보안 모델을 우회하여 정보를 유출하는 스펙터 기반 공격의 예시입니다."
  },
  {
    id: 28,
    category: "Part 3: 스펙터(Spectre) 공격 메커니즘",
    question: "스펙터는 조건 분기(Conditional branch) 외에 어떤 분기에서도 작동합니까?",
    options: ["a) 간접 분기 (Indirect branches)", "b) 시스템 콜", "c) 인터럽트", "d) 덧셈 연산"],
    answer: 0,
    explanation: "스펙터는 조건 분기(Variant 1)뿐만 아니라 함수 포인터 등을 사용하는 간접 분기(Variant 2)에서도 작동합니다."
  },
  {
    id: 29,
    category: "Part 3: 스펙터(Spectre) 공격 메커니즘",
    question: "스펙터 공격 시나리오에서 array1_size 가 캐시에 없을 때(Cache miss) 발생하는 현상은?",
    options: [
      "a) CPU가 멈춘다.",
      "b) 데이터를 가져오는 딜레이 동안 프로세서가 추측 실행을 시작한다.",
      "c) 즉시 예외가 발생한다.",
      "d) 다른 프로세스로 전환된다."
    ],
    answer: 1,
    explanation: "array1_size를 메모리에서 가져오는 딜레이(Cache Miss) 동안 CPU는 멈추지 않고 예측된 경로로 추측 실행을 진행합니다."
  },
  {
    id: 30,
    category: "Part 3: 스펙터(Spectre) 공격 메커니즘",
    question: "스펙터 공격 방어를 위해 제안된 명확한 하드웨어 수정법은 자료 작성 시점 기준으로 존재합니까?",
    options: ["a) 예, 모든 CPU가 리콜되었다.", "b) 아니오, 알려진 수정법이 없다.", "c) 예, 바이오스 업데이트로 완벽 해결되었다.", "d) 예, KPTI로 해결된다."],
    answer: 1,
    explanation: "자료에 따르면 스펙터를 완벽하게 막는 단일 하드웨어 수정법은 아직 없으며, 소프트웨어 완화책이나 마이크로코드 업데이트가 주로 사용됩니다."
  },
  // Part 4
  {
    id: 31,
    category: "Part 4: 심화 개념 및 비교",
    question: "캐시 부채널 공격(Covert channel)의 기본 단계 순서로 올바른 것은?",
    options: ["a) Read -> Flush -> Wait", "b) Flush -> Access Secret (Sender) -> Reload/Probe (Receiver)", "c) Reload -> Flush -> Access", "d) Wait -> Read -> Flush"],
    answer: 1,
    explanation: "일반적인 Flush+Reload 공격 순서: 공격자가 캐시를 비움(Flush) -> 희생자(또는 추측 실행)가 비밀 값에 의존하여 메모리 접근(Sender) -> 공격자가 시간 측정으로 접근 여부 확인(Reload/Probe)."
  },
  {
    id: 32,
    category: "Part 4: 심화 개념 및 비교",
    question: "clflush 명령어의 기능은?",
    options: ["a) 캐시 라인을 비운다(Flush).", "b) 캐시 라인을 읽는다.", "c) 캐시 라인을 쓴다.", "d) 캐시 라인을 잠근다."],
    answer: 0,
    explanation: "clflush (Cache Line Flush) 명령어는 지정된 주소의 캐시 라인을 캐시 계층에서 제거합니다."
  },
  {
    id: 33,
    category: "Part 4: 심화 개념 및 비교",
    question: "멜트다운 공격 코드에서 jz retry (Line 6)가 있는 이유는?",
    options: [
      "a) 무한 루프를 만들기 위해",
      "b) 경쟁 상태(Race condition)에서 비밀 값을 읽기 전에 0으로 초기화되는 경우를 대비해 재시도하기 위해",
      "c) 분기 예측을 훈련하기 위해",
      "d) 예외를 발생시키기 위해"
    ],
    answer: 1,
    explanation: "멜트다운은 경쟁 상태(Race Condition)를 이용하므로 항상 성공하지 않습니다. 실패하여 0을 읽거나 예외만 발생했을 경우 다시 시도하기 위한 로직입니다."
  },
  {
    id: 34,
    category: "Part 4: 심화 개념 및 비교",
    question: "리눅스 커널 메모리가 사용자 프로세스 주소 공간에 매핑되는 방식의 특징은?",
    options: [
      "a) 물리 메모리 전체가 커널 영역의 특정 오프셋에 직접 매핑(Direct mapping)된다.",
      "b) 커널 메모리는 매핑되지 않는다.",
      "c) 일부 페이지만 무작위로 매핑된다.",
      "d) 암호화되어 매핑된다."
    ],
    answer: 0,
    explanation: "리눅스 등 운영체제는 성능 효율을 위해 물리 메모리 전체를 커널 주소 공간의 특정 오프셋(Physmap 등)에 직접 매핑(Direct mapping)합니다."
  },
  {
    id: 35,
    category: "Part 4: 심화 개념 및 비교",
    question: "멜트다운 공격을 통해 획득할 수 있는 정보의 범위는?",
    options: ["a) 현재 프로세스의 메모리만", "b) L1 캐시 내용만", "c) 물리 메모리 전체 덤프 가능", "d) 하드 디스크 내용 전체"],
    answer: 2,
    explanation: "커널 영역에 물리 메모리 전체가 매핑되어 있으므로, 멜트다운 공격을 통해 물리 메모리 전체의 내용을 덤프할 수 있습니다."
  },
  {
    id: 36,
    category: "Part 4: 심화 개념 및 비교",
    question: "Firefox 56을 대상으로 한 멜트다운 공격 시연에서 유출된 정보의 예시는?",
    options: ["a) 브라우저 히스토리만", "b) 저장된 비밀번호 (Saved Passwords)", "c) 쿠키 파일", "d) 자바스크립트 소스코드"],
    answer: 1,
    explanation: "강의 자료 예시에서 Firefox의 비밀번호 관리자에 저장된 평문 패스워드가 멜트다운 공격으로 유출되는 것을 시연했습니다."
  },
  {
    id: 37,
    category: "Part 4: 심화 개념 및 비교",
    question: "비순차 실행에서 실행이 완료되었으나 아직 결과가 확정되지 않은 상태를 무엇이라 합니까?",
    options: ["a) Retired", "b) Speculative", "c) Committed", "d) Flushed"],
    answer: 1,
    explanation: "실행은 되었지만 아직 앞선 명령어들의 완료 여부나 분기 예측 결과가 확정되지 않아 아키텍처에 반영되지 않은 상태를 추측 실행(Speculative) 상태라고 합니다."
  },
  {
    id: 38,
    category: "Part 4: 심화 개념 및 비교",
    question: "명령어가 최종적으로 완료되어 아키텍처 상태에 반영되는 것을 무엇이라 합니까?",
    options: ["a) Execute", "b) Fetch", "c) Retire", "d) Decode"],
    answer: 2,
    explanation: "Retire(은퇴/완료)는 명령어의 실행 결과가 확정되어 레지스터나 메모리 등의 아키텍처 상태에 영구적으로 반영되는 단계입니다."
  },
  {
    id: 39,
    category: "Part 4: 심화 개념 및 비교",
    question: "캐시 히트(Cache Hit)와 캐시 미스(Cache Miss) 중 접근 시간이 더 짧은 것은?",
    options: ["a) 캐시 미스", "b) 캐시 히트", "c) 둘 다 동일하다", "d) 알 수 없다"],
    answer: 1,
    explanation: "데이터가 캐시에 존재할 때(Cache Hit)는 메인 메모리에 접근할 필요가 없어 접근 시간이 훨씬 짧습니다."
  },
  {
    id: 40,
    category: "Part 4: 심화 개념 및 비교",
    question: "멜트다운 방어 기법인 KPTI의 단점은 무엇입니까?",
    options: ["a) 보안이 약하다.", "b) 성능 저하 (Performance impact)", "c) 구현이 불가능하다.", "d) 메모리 용량을 줄인다."],
    answer: 1,
    explanation: "KPTI는 사용자 모드와 커널 모드 전환 시마다 페이지 테이블을 교체해야 하므로(CR3 재로드 및 TLB 플러시 등) 성능 오버헤드가 발생합니다."
  },
  {
    id: 41,
    category: "Part 4: 심화 개념 및 비교",
    question: "스펙터 공격에서 array2[array1[x]*256] 와 같은 코드가 필요한 이유는?",
    options: [
      "a) 비밀 값(array1[x])을 캐시 상태(array2의 인덱스 접근)로 변환하여 부채널로 전송하기 위해",
      "b) 단순히 계산 속도를 늦추기 위해",
      "c) 배열의 크기를 늘리기 위해",
      "d) 메모리 오류를 유발하기 위해"
    ],
    answer: 0,
    explanation: "비밀 값(array1[x]) 자체는 직접 읽을 수 없으므로, 이를 인덱스로 사용하여 array2 의 특정 위치를 캐시에 로드함으로써 비밀 값을 '캐시 상태(위치 정보)'로 변환합니다."
  },
  {
    id: 42,
    category: "Part 4: 심화 개념 및 비교",
    question: "현대 운영체제에서 커널 메모리를 사용자 공간에 매핑해 두었던 주된 이유는?",
    options: ["a) 보안을 강화하기 위해", "b) 성능(시스템 콜 처리 속도 등)을 높이기 위해", "c) 메모리를 절약하기 위해", "d) 하드웨어 제약을 피하기 위해"],
    answer: 1,
    explanation: "시스템 콜 처리 시 사용자 모드와 커널 모드 간 전환 속도를 높이기 위해(TLB 플러시 방지 등) 커널 메모리를 매핑해 두었습니다."
  },
  {
    id: 43,
    category: "Part 4: 심화 개념 및 비교",
    question: "멜트다운 공격의 '0-noise-bias'란 무엇을 의미합니까?",
    options: ["a) 노이즈가 전혀 없는 완벽한 채널", "b) 공격이 실패할 확률이 0임", "c) 특정 명령어 시퀀스를 통한 재시도 로직", "d) 소리가 나지 않는 공격"],
    answer: 2,
    explanation: "멜트다운 시도 중 실패하여 0을 읽는 경우(Noise)를 편향(Bias) 없이 보정하여 정확한 비밀 값을 얻기 위한 재시도 및 통계적 로직을 의미합니다."
  },
  {
    id: 44,
    category: "Part 4: 심화 개념 및 비교",
    question: "스펙터 공격의 'Speculative Return-oriented Programming'은 무엇을 의미합니까?",
    options: [
      "a) 가젯(Gadget)들을 엮어서 원하는 추측 실행 효과를 내는 기법",
      "b) 스택 오버플로우 공격의 일종",
      "c) 리턴 주소를 조작하여 쉘 코드를 실행함",
      "d) 프로그래밍 언어의 새로운 패러다임"
    ],
    answer: 0,
    explanation: "기존 ROP(Return Oriented Programming)처럼 코드 조각(가젯)들을 연결하여 공격자가 원하는 형태의 추측 실행 흐름을 만들어내는 기법입니다."
  },
  {
    id: 45,
    category: "Part 4: 심화 개념 및 비교",
    question: "다음 중 멜트다운/스펙터와 관련 없는 개념은?",
    options: ["a) Side-channel attack", "b) SQL Injection", "c) Cache timing attack", "d) Microarchitectural covert channel"],
    answer: 1,
    explanation: "SQL Injection은 웹 애플리케이션의 입력값 검증 부재로 발생하는 소프트웨어적 취약점으로, 하드웨어 부채널 공격인 멜트다운/스펙터와는 관련이 없습니다."
  },
  {
    id: 46,
    category: "Part 4: 심화 개념 및 비교",
    question: "캐시 메모리의 L1, L2는 보통 어떻게 구성됩니까?",
    options: ["a) 모든 코어가 공유한다.", "b) 개별 코어에 전용(Private)으로 할당된다.", "c) 메인 메모리에 위치한다.", "d) 클라우드 서버에 있다."],
    answer: 1,
    explanation: "일반적으로 L1, L2 캐시는 각 CPU 코어마다 전용(Private)으로 할당되어 독립적으로 사용됩니다."
  },
  {
    id: 47,
    category: "Part 4: 심화 개념 및 비교",
    question: "멜트다운 공격 시나리오에서 자식 프로세스(Child process)의 역할은?",
    options: ["a) 비밀번호를 입력한다.", "b) 예외 발생 시 죽지만 캐시 상태를 변화시킨다.", "c) 부모 프로세스를 감시한다.", "d) 아무 역할도 하지 않는다."],
    answer: 1,
    explanation: "멜트다운 데모 코드에서 자식 프로세스는 금지된 커널 주소에 접근하여 예외를 발생시키고 죽지만, 그 찰나의 순간에 비순차 실행을 통해 캐시 상태를 변화시켜 부모 프로세스에게 정보를 전달하는 역할을 합니다."
  },
  {
    id: 48,
    category: "Part 4: 심화 개념 및 비교",
    question: "가상 주소 공간의 크기(64비트 머신)는 대략 어느 정도입니까?",
    options: ["a) 4GB", "b) 256TB (~281TB)", "c) 1MB", "d) 64KB"],
    answer: 1,
    explanation: "64비트 시스템(x86-64)은 이론적으로 매우 큰 주소 공간을 가지며, 현재 구현상으로는 약 256TB(48-bit addressing) 이상의 광범위한 영역을 사용합니다."
  },
  {
    id: 49,
    category: "Part 4: 심화 개념 및 비교",
    question: "멜트다운 공격은 가상 머신(Docker, OpenVZ 등) 환경에서도 유효합니까?",
    options: ["a) 아니오, 가상 머신에서는 안전하다.", "b) 예, 컨테이너 및 가상화 환경에서도 적용되었다.", "c) Docker에서만 가능하다.", "d) Windows에서만 가능하다."],
    answer: 1,
    explanation: "멜트다운은 동일한 커널을 공유하는 컨테이너 환경이나, 가상 머신 환경에서도 호스트 커널 메모리 등을 읽는 데 악용될 수 있습니다."
  },
  {
    id: 50,
    category: "Part 4: 심화 개념 및 비교",
    question: "멜트다운과 스펙터 사태가 컴퓨터 아키텍처에 시사하는 가장 큰 점은?",
    options: [
      "a) 소프트웨어만 잘 만들면 된다.",
      "b) 성능을 위한 하드웨어 설계가 보안 취약점이 될 수 있다.",
      "c) 인텔 CPU는 사용하면 안 된다.",
      "d) 캐시 메모리는 필요 없다."
    ],
    answer: 1,
    explanation: "성능 최적화(비순차/추측 실행)를 위한 하드웨어 설계가 보안 부채널을 만들어낼 수 있다는 점을 시사합니다."
  }
];

// --- 컴포넌트 ---

export default function QuizPage3() {
  return (
    <QuizTemplate 
      title="소프트웨어 및 시스템 보안" 
      subtitle="HW Security & TEE"
      quizData={quizData} 
    />
  );
}