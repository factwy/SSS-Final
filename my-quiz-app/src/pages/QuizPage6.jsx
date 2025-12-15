import QuizTemplate from './QuizTemplate';

const quizData = [
  {
    id: 1,
    category: "Software Defense",
    question: "다음 중 DEP(Data Execution Prevention)에 대한 설명으로 옳은 것은?",
    options: [
      "a) 스택의 반환 주소(Return Address)를 검증하여 공격을 막는다.",
      "b) 쓰기 가능한 메모리 영역(Stack, Heap 등)에서 코드가 실행되는 것을 방지한다.",
      "c) 프로그램이 실행될 때마다 메모리 주소를 무작위로 배치한다.",
      "d) 함수의 프롤로그와 에필로그에 검사 코드를 삽입한다.",
      "e) 컴파일 시점에 소스 코드의 취약점을 분석한다."
    ],
    answer: 1,
    explanation: "DEP는 데이터 영역(Stack, Heap 등)에 실행 권한을 없애(Non-Executable), 공격자가 주입한 쉘코드가 실행되지 않도록 하는 기법입니다."
  },
  {
    id: 2,
    category: "Software Defense",
    question: "Stack Canary(Stack Cookie)가 방어하고자 하는 주된 공격 기법은 무엇인가?",
    options: [
      "a) Use-After-Free",
      "b) SQL Injection",
      "c) Race Condition",
      "d) Stack Buffer Overflow",
      "e) Integer Overflow"
    ],
    answer: 3,
    explanation: "Stack Canary는 스택 버퍼 오버플로우 발생 시 반환 주소(Return Address)가 덮어씌워지기 전에 Canary 값이 변조되었는지를 확인하여 공격을 탐지합니다."
  },
  {
    id: 3,
    category: "Software Defense",
    question: "ASLR(Address Space Layout Randomization)에 대한 설명으로 옳지 않은 것은?",
    options: [
      "a) 실행 시마다 스택, 힙, 라이브러리의 주소를 무작위로 변경한다.",
      "b) 공격자가 특정 함수의 주소를 예측하기 어렵게 만든다.",
      "c) NOP Sled 기법을 무력화하는 데 도움을 줄 수 있다.",
      "d) 64비트 시스템보다 32비트 시스템에서 더 높은 엔트로피(보안성)를 가진다.",
      "e) Brute Force 공격이나 Information Leak 취약점에 의해 우회될 수 있다."
    ],
    answer: 3,
    explanation: "32비트 시스템은 주소 공간이 작아 엔트로피가 낮으므로, 주소 공간이 훨씬 넓은 64비트 시스템이 ASLR 효과가 더 큽니다."
  },
  {
    id: 4,
    category: "Software Defense",
    question: "GOT(Global Offset Table)를 덮어쓰는 공격을 방지하기 위한 메모리 보호 기법은?",
    options: [
      "a) Stack Canary",
      "b) DEP",
      "c) RELRO (Relocation Read-Only)",
      "d) KASLR",
      "e) SMAP"
    ],
    answer: 2,
    explanation: "RELRO(Relocation Read-Only)는 링커가 심볼 해석을 마친 후 GOT 영역을 읽기 전용(Read-Only)으로 변경하여 GOT Overwrite 공격을 방지합니다."
  },
  {
    id: 5,
    category: "Hardware-based Security",
    question: "Intel CPU의 기능 중 커널 모드(Ring 0)에서 사용자 모드(Ring 3)의 코드를 '실행'하는 것을 방지하는 기법은?",
    options: [
      "a) SMAP (Supervisor Mode Access Prevention)",
      "b) SMEP (Supervisor Mode Execution Prevention)",
      "c) SGX (Software Guard Extensions)",
      "d) TSX (Transactional Synchronization Extensions)",
      "e) MPX (Memory Protection Extensions)"
    ],
    answer: 1,
    explanation: "SMEP(Supervisor Mode Execution Prevention)는 커널 모드에서 유저 공간의 코드를 실행하려 할 때 폴트를 발생시켜 Ret2User 공격 등을 방어합니다."
  },
  {
    id: 6,
    category: "Hardware-based Security",
    question: "Intel SMAP(Supervisor Mode Access Prevention)의 기능을 올바르게 설명한 것은?",
    options: [
      "a) 커널이 유저 영역의 데이터를 '접근(읽기/쓰기)'하는 것을 차단한다.",
      "b) 커널이 유저 영역의 코드를 실행하는 것을 차단한다.",
      "c) 유저가 커널 영역의 데이터를 읽는 것을 차단한다.",
      "d) 하이퍼바이저가 게스트 OS의 메모리를 읽는 것을 차단한다.",
      "e) SGX Enclave 내부의 메모리 접근을 제어한다."
    ],
    answer: 0,
    explanation: "SMAP는 커널(Supervisor) 모드에서 의도치 않게 유저 공간의 데이터에 접근(Access)하는 것을 하드웨어적으로 방지합니다."
  },
  {
    id: 7,
    category: "Hardware-based Security",
    question: "Intel MPX(Memory Protection Extensions)가 해결하고자 했던 주된 소프트웨어 취약점은?",
    options: [
      "a) Use-After-Free",
      "b) Race Condition",
      "c) Buffer Overflow (Bounds Checking)",
      "d) SQL Injection",
      "e) Format String Bug"
    ],
    answer: 2,
    explanation: "MPX는 포인터의 범위(Bounds)를 하드웨어적으로 검사하여 버퍼 오버플로우와 같은 경계 오류를 방지하기 위해 설계되었습니다(현재는 하드웨어에서 제거되는 추세임)."
  },
  {
    id: 8,
    category: "Hardware-based Security",
    question: "Intel MPK(Memory Protection Keys)의 특징으로 가장 적절한 것은?",
    options: [
      "a) 페이지 테이블을 수정하지 않고도 사용자 공간에서 메모리 페이지 권한을 빠르게 변경할 수 있다.",
      "b) 커널 영역의 메모리를 암호화한다.",
      "c) 스택의 반환 주소를 별도의 섀도우 스택에 저장한다.",
      "d) 실행 흐름을 제어하기 위해 간접 분기(Indirect Branch)를 추적한다.",
      "e) 외부의 물리적 공격으로부터 메모리를 보호한다."
    ],
    answer: 0,
    explanation: "MPK는 페이지 테이블 항목의 사용되지 않는 비트를 활용하여 도메인 ID를 할당하고, PKRU 레지스터를 통해 유저 레벨에서 빠르게 메모리 접근 권한을 제어할 수 있게 합니다."
  },
  {
    id: 9,
    category: "Hardware-based Security",
    question: "ARM 아키텍처의 PAC(Pointer Authentication Code)가 활용하는 것은?",
    options: [
      "a) 별도의 보안 코프로세서",
      "b) 64비트 주소 중 사용되지 않는 상위 비트",
      "c) 메모리 버스의 데이터 라인",
      "d) L1 캐시의 태그 비트",
      "e) TrustZone의 보안 메모리"
    ],
    answer: 1,
    explanation: "ARM PAC는 64비트 포인터에서 실제 주소로 사용되지 않는 상위 비트에 암호화 서명(PAC)을 저장하여 포인터 변조를 탐지합니다."
  },
  {
    id: 10,
    category: "Hardware-based Security",
    question: "ARM MTE(Memory Tagging Extension)의 주된 목적은 무엇인가?",
    options: [
      "a) 실행 코드의 서명을 검증한다.",
      "b) 메모리 할당 시 태그를 부여하여 Use-After-Free 및 Out-of-Bounds 접근을 탐지한다.",
      "c) 커널 메모리를 유저로부터 숨긴다.",
      "d) 부팅 과정을 검증한다.",
      "e) 암호화 키를 안전하게 저장한다."
    ],
    answer: 1,
    explanation: "MTE는 포인터와 해당 포인터가 가리키는 메모리 청크에 동일한 '태그'를 부여하고, 접근 시 이 태그가 일치하는지 하드웨어적으로 검사하여 메모리 안전성을 보장합니다."
  },
  {
    id: 11,
    category: "Hardware-based Security",
    question: "Intel CET(Control-flow Enforcement Technology)의 두 가지 주요 구성 요소는?",
    options: [
      "a) SGX와 TrustZone",
      "b) Shadow Stack과 Indirect Branch Tracking(IBT)",
      "c) MPX와 MPK",
      "d) SMEP와 SMAP",
      "e) ASLR과 DEP"
    ],
    answer: 1,
    explanation: "CET는 ROP 공격 방어를 위한 Shadow Stack과 JOP/COP 공격 방어를 위한 Indirect Branch Tracking(IBT)으로 구성됩니다."
  },
  {
    id: 12,
    category: "Hardware-based Security",
    question: "Intel SGX(Software Guard Extensions)에 대한 설명으로 옳은 것은?",
    options: [
      "a) 운영체제가 Enclave 내부의 메모리를 직접 읽을 수 있다.",
      "b) Enclave 내의 데이터는 메모리에 평문으로 저장된다.",
      "c) 신뢰할 수 없는 운영체제 환경에서도 애플리케이션의 비밀을 보호할 수 있다.",
      "d) 커널 모드에서만 Enclave를 생성할 수 있다.",
      "e) ARM TrustZone과 동일한 기술의 다른 이름이다."
    ],
    answer: 2,
    explanation: "SGX는 운영체제나 하이퍼바이저가 악의적이더라도 애플리케이션의 특정 영역(Enclave)을 보호할 수 있도록 설계되었으며, 메모리에 저장될 때 데이터가 암호화됩니다."
  },
  {
    id: 13,
    category: "Cache Attacks",
    question: "Meltdown 공격이 악용하는 CPU의 마이크로 아키텍처 기술은?",
    options: [
      "a) 비순차 실행 (Out-of-Order Execution)",
      "b) 하이퍼스레딩 (Hyper-threading)",
      "c) 가상화 기술 (Intel VT-x)",
      "d) 보안 부팅 (Secure Boot)",
      "e) 메모리 태깅 (Memory Tagging)"
    ],
    answer: 0,
    explanation: "Meltdown은 CPU의 비순차 실행(Out-of-Order Execution) 특성을 악용하여, 권한 검사가 완료되기 전에 커널 메모리를 읽고 캐시 부채널을 통해 데이터를 유출합니다."
  },
  {
    id: 14,
    category: "Cache Attacks",
    question: "Spectre 공격이 악용하는 CPU의 마이크로 아키텍처 기술은?",
    options: [
      "a) 페이징 (Paging)",
      "b) 분기 예측 (Branch Prediction) 및 투기적 실행 (Speculative Execution)",
      "c) 인터럽트 처리 (Interrupt Handling)",
      "d) 직접 메모리 접근 (DMA)",
      "e) 권한 레벨 분리 (Protection Rings)"
    ],
    answer: 1,
    explanation: "Spectre는 분기 예측(Branch Prediction)을 속여 CPU가 투기적 실행(Speculative Execution)을 하도록 유도하고, 그 과정에서 발생한 캐시 변화를 통해 정보를 유출합니다."
  },
  {
    id: 15,
    category: "Cache Attacks",
    question: "Meltdown 공격을 방어하기 위해 운영체제 레벨에서 도입된 패치는?",
    options: [
      "a) Stack Canary",
      "b) KASLR (Kernel Address Space Layout Randomization)",
      "c) KPTI (Kernel Page Table Isolation)",
      "d) DEP (Data Execution Prevention)",
      "e) CFI (Control Flow Integrity)"
    ],
    answer: 2,
    explanation: "KPTI(Kernel Page Table Isolation)는 유저 모드와 커널 모드의 페이지 테이블을 분리하여, 유저 모드에서 커널 메모리 매핑을 제거함으로써 Meltdown을 방어합니다."
  },
  {
    id: 16,
    category: "Cache Attacks",
    question: "캐시 부채널 공격(Cache Side-Channel Attack)의 기본 단계 중, 공격자가 캐시 라인을 비우는 단계에 해당하는 명령어는?",
    options: [
      "a) mov",
      "b) clflush",
      "c) rdtsc",
      "d) xchg",
      "e) nop"
    ],
    answer: 1,
    explanation: "Flush+Reload 같은 공격에서 공격자는 `clflush` 명령어를 사용하여 특정 메모리 주소에 해당하는 캐시 라인을 비웁니다."
  },
  {
    id: 17,
    category: "Hardware-based Security",
    question: "Intel TSX(Transactional Synchronization Extensions)를 악용한 공격은 주로 무엇을 무력화하는 데 사용되었는가?",
    options: [
      "a) DEP",
      "b) Stack Canary",
      "c) KASLR (타이밍 측정 채널로 사용)",
      "d) Secure Boot",
      "e) Code Signing"
    ],
    answer: 2,
    explanation: "TSX를 사용하면 예외 발생 시 운영체제에 알리지 않고 트랜잭션을 중단할 수 있는데, 이를 이용하여 커널 주소 접근 시의 타이밍 차이를 측정, KASLR을 우회할 수 있습니다."
  },
  {
    id: 18,
    category: "OS Kernel Security",
    question: "리눅스 커널에서 시스템 콜 테이블(System Call Table)은 무엇을 저장하고 있는가?",
    options: [
      "a) 실행 중인 프로세스의 목록",
      "b) 파일 시스템의 아이노드 정보",
      "c) 시스템 콜 핸들러 함수들의 주소",
      "d) 유저 계정의 비밀번호 해시",
      "e) 하드웨어 인터럽트 번호"
    ],
    answer: 2,
    explanation: "시스템 콜 테이블은 각 시스템 콜 번호에 해당하는 커널 내부의 핸들러 함수 주소를 배열 형태로 저장하고 있습니다."
  },
  {
    id: 19,
    category: "OS Kernel Security",
    question: "루트킷(Rootkit)이 자신의 존재를 숨기기 위해 사용하는 DKOM(Direct Kernel Object Manipulation) 기법의 예시는?",
    options: [
      "a) /etc/passwd 파일 삭제",
      "b) 프로세스 리스트(tasks list)에서 자신의 프로세스 구조체 연결을 끊음",
      "c) 시스템 콜 테이블의 주소를 0으로 초기화",
      "d) 네트워크 케이블을 물리적으로 차단",
      "e) 관리자 권한을 가진 새로운 계정 생성"
    ],
    answer: 1,
    explanation: "DKOM은 커널 객체(구조체)를 직접 조작하는 기법으로, 예를 들어 이중 연결 리스트로 관리되는 프로세스 목록에서 특정 프로세스의 연결 고리를 끊어 ps 명령어로 보이지 않게 만듭니다."
  },
  {
    id: 20,
    category: "TEE (Trusted Execution Environment)",
    question: "ARM TrustZone에서 'Secure World'와 'Normal World'를 구분하는 가장 핵심적인 하드웨어 비트는?",
    options: [
      "a) NX bit",
      "b) NS (Non-Secure) bit",
      "c) V bit",
      "d) Z bit",
      "e) Carry bit"
    ],
    answer: 1,
    explanation: "ARM TrustZone은 시스템 버스 및 프로세서 상태에서 NS(Non-Secure) 비트를 사용하여 현재 상태가 Secure World인지 Normal World인지를 구분합니다."
  },
  {
    id: 21,
    category: "TEE (Trusted Execution Environment)",
    question: "Normal World에서 Secure World로 진입하기 위해 사용하는 ARM 어셈블리 명령어는?",
    options: [
      "a) SVC (Supervisor Call)",
      "b) HVC (Hypervisor Call)",
      "c) SMC (Secure Monitor Call)",
      "d) IRQ",
      "e) RET"
    ],
    answer: 2,
    explanation: "Normal World에서 Secure World의 서비스를 요청하거나 전환할 때 SMC(Secure Monitor Call) 명령어를 사용하여 모니터 모드로 진입합니다."
  },
  {
    id: 22,
    category: "TEE (Trusted Execution Environment)",
    question: "ARMv8 아키텍처에서 'Monitor Mode'가 실행되는 권한 레벨(Exception Level)은?",
    options: [
      "a) EL0",
      "b) EL1",
      "c) EL2",
      "d) EL3",
      "e) EL4"
    ],
    answer: 3,
    explanation: "ARMv8에서 EL3는 가장 높은 권한 레벨로, Secure Monitor가 실행되며 Secure World와 Normal World 간의 전환을 담당합니다."
  },
  {
    id: 23,
    category: "TEE (Trusted Execution Environment)",
    question: "다음 중 TEE(Trusted Execution Environment)의 활용 사례로 가장 적절하지 않은 것은?",
    options: [
      "a) DRM 콘텐츠 복호화 및 재생",
      "b) 생체 인식(지문 등) 데이터 처리",
      "c) 모바일 결제 시 PIN 입력 보호",
      "d) 일반적인 웹 브라우징 속도 향상",
      "e) 기업용 인증서 및 키 저장"
    ],
    answer: 3,
    explanation: "TEE는 보안이 중요한 데이터나 연산을 격리하여 보호하는 데 사용되며, 일반적인 웹 브라우징 속도 향상(성능 목적)과는 직접적인 관련이 적습니다."
  },
  {
    id: 24,
    category: "Software Defense",
    question: "Partial RELRO와 Full RELRO의 가장 큰 차이점은 무엇인가?",
    options: [
      "a) 스택 카나리 사용 여부",
      "b) GOT(Global Offset Table) 영역이 읽기 전용(Read-Only)인지 여부",
      "c) ASLR 적용 여부",
      "d) 힙 메모리 실행 권한 여부",
      "e) 소스 코드 공개 여부"
    ],
    answer: 1,
    explanation: "Partial RELRO는 GOT가 쓰기 가능하지만, Full RELRO는 런타임 시작 시 모든 심볼을 바인딩하고 GOT를 읽기 전용으로 만들어 GOT Overwrite 공격을 막습니다."
  },
  {
    id: 25,
    category: "TEE (Trusted Execution Environment)",
    question: "TPM(Trusted Platform Module)의 PCR(Platform Configuration Register)의 주된 용도는?",
    options: [
      "a) 사용자 비밀번호 저장",
      "b) 부팅 과정의 무결성 측정값(해시) 누적 저장",
      "c) 네트워크 패킷 필터링",
      "d) 가상 메모리 주소 변환",
      "e) CPU 클럭 속도 제어"
    ],
    answer: 1,
    explanation: "PCR은 시스템 부팅 단계별로 코드나 설정의 해시값을 'Extend' 연산을 통해 누적 저장하여, 나중에 시스템이 변조되지 않았음을 증명(Attestation)하는 데 사용됩니다."
  },
  {
    id: 26,
    category: "TEE (Trusted Execution Environment)",
    question: "TPM의 'Sealing(봉인)' 기능에 대한 설명으로 옳은 것은?",
    options: [
      "a) 하드웨어 케이스를 열지 못하게 한다.",
      "b) 데이터를 암호화할 때 특정 PCR 상태(시스템 무결성 상태)를 조건으로 건다.",
      "c) 네트워크 포트를 봉인하여 접속을 차단한다.",
      "d) 바이러스를 격리 공간에 가둔다.",
      "e) 공장 초기화 상태로 되돌린다."
    ],
    answer: 1,
    explanation: "Sealing은 데이터를 암호화할 때 현재의 시스템 상태(PCR 값)를 함께 결합하여, 시스템이 동일한 신뢰 상태일 때만 데이터를 복호화(Unsealing)할 수 있게 하는 기능입니다."
  },
  {
    id: 27,
    category: "Hardware-based Security",
    question: "Intel ME(Management Engine)에 대한 설명으로 옳은 것은?",
    options: [
      "a) 메인 CPU 내부의 코어 중 하나를 사용한다.",
      "b) 호스트 OS가 꺼져 있어도 전원이 연결되어 있으면 독립적으로 동작할 수 있다.",
      "c) 리눅스 커널의 일부분이다.",
      "d) 오직 사용자의 키보드 입력만 처리한다.",
      "e) 네트워크 접근 권한이 없다."
    ],
    answer: 1,
    explanation: "Intel ME는 칩셋(PCH 등)에 내장된 별도의 마이크로컨트롤러로, 호스트 OS와 독립적으로 동작하며 전원 관리, 원격 관리(AMT) 등의 기능을 수행합니다."
  },
  {
    id: 28,
    category: "OS Kernel Security",
    question: "공격자가 커널 모드 권한을 얻었을 때 할 수 있는 행위가 아닌 것은?",
    options: [
      "a) 프로세스 리스트 조작하여 백도어 숨기기",
      "b) 파일 시스템 접근 제어 우회",
      "c) 네트워크 트래픽 가로채기 및 변조",
      "d) 하드웨어 장치 직접 제어",
      "e) 물리적으로 분리된 다른 서버의 전원 끄기 (네트워크 연결 없음)"
    ],
    answer: 4,
    explanation: "커널 권한이 있더라도 네트워크 연결이 없는 물리적으로 분리된(Air-gapped) 다른 하드웨어에 직접적인 물리적 영향을 주기는 어렵습니다."
  },
  {
    id: 29,
    category: "Software Defense",
    question: "Return-to-libc 공격이 가능한 주된 이유는?",
    options: [
      "a) 스택에 실행 권한이 있기 때문이다.",
      "b) 라이브러리 함수(system 등)가 메모리에 이미 적재되어 있고 실행 가능하기 때문이다.",
      "c) ASLR이 모든 주소를 0으로 만들기 때문이다.",
      "d) 카나리 값이 항상 고정되어 있기 때문이다.",
      "e) 소스 코드가 공개되어 있기 때문이다."
    ],
    answer: 1,
    explanation: "Return-to-libc는 스택의 실행 권한(NX)을 우회하기 위해, 이미 실행 권한이 있는 메모리 영역(공유 라이브러리 등)에 존재하는 함수로 실행 흐름을 돌리는 공격입니다."
  },
  {
    id: 30,
    category: "TEE (Trusted Execution Environment)",
    question: "OP-TEE(Open Portable TEE) 구조에서 'Tee-supplicant'의 역할은?",
    options: [
      "a) Secure World의 커널 역할을 한다.",
      "b) Normal World(리눅스 등)에서 실행되며 TEE가 필요로 하는 RPC(파일 로드 등)를 돕는다.",
      "c) 하드웨어 인터럽트를 처리한다.",
      "d) 암호화 키를 생성한다.",
      "e) 화면 출력을 담당한다."
    ],
    answer: 1,
    explanation: "tee-supplicant는 리눅스(Normal World) 유저 공간에서 실행되는 데몬으로, TEE가 파일 시스템 접근 등 Normal World의 자원을 필요로 할 때 이를 중계해주는 역할을 합니다."
  },
  {
    id: 31,
    category: "Software Defense",
    question: "다음 중 ROP(Return Oriented Programming) 공격을 어렵게 만드는 방어 기법은?",
    options: [
      "a) W^X (Write XOR Execute) / DEP",
      "b) ASLR (Address Space Layout Randomization)",
      "c) Stack Canary",
      "d) Control Flow Integrity (CFI) 및 Intel CET",
      "e) 위 모든 것"
    ],
    answer: 4,
    explanation: "ROP는 코드 재사용 공격이므로 이를 막기 위해 코드 영역의 위치를 숨기는 ASLR, 흐름을 검증하는 CFI/CET, 스택 오버플로우를 막는 Canary 등이 복합적으로 작용합니다. 특히 CET는 ROP 방어에 특화되어 있습니다."
  },
  {
    id: 32,
    category: "OS Kernel Security",
    question: "가상 파일 시스템(VFS) Hooking은 주로 어떤 객체를 조작하여 이루어지는가?",
    options: [
      "a) CPU 레지스터",
      "b) 파일의 i-node 구조체 내의 연산 함수 포인터(f_op 등)",
      "c) 그래픽 카드 드라이버",
      "d) 전원 관리 모듈",
      "e) 유저 스택"
    ],
    answer: 1,
    explanation: "VFS Hooking은 파일 시스템의 추상화 계층인 VFS에서 파일 객체나 i-node 객체가 가리키는 연산 함수 포인터(open, read, write 등)를 가로채서 악성 함수로 연결하는 방식입니다."
  },
  {
    id: 33,
    category: "Hardware-based Security",
    question: "ARM TrustZone을 사용하는 시스템에서 부팅 과정의 신뢰 사슬(Chain of Trust)을 형성하는 펌웨어의 명칭으로 올바른 것은? (ARM Trusted Firmware 기준)",
    options: [
      "a) BIOS - UEFI - Kernel",
      "b) BL1 - BL2 - BL31 - BL32 ...",
      "c) Stage1 - Stage2 - Stage3",
      "d) MBR - GRUB - Linux",
      "e) Ring0 - Ring1 - Ring2"
    ],
    answer: 1,
    explanation: "ARM Trusted Firmware(ATF)는 부팅 단계를 BL1(Boot ROM), BL2(Loader), BL31(EL3 Runtime), BL32(Secure OS), BL33(Non-secure Bootloader) 등으로 구분하여 신뢰 사슬을 구축합니다."
  },
  {
    id: 34,
    category: "OS Kernel Security",
    question: "리눅스 커널 모듈(.ko)을 로드할 때 사용하는 명령어와 시스템 콜의 조합으로 옳은 것은?",
    options: [
      "a) load / sys_load",
      "b) insmod / init_module",
      "c) import / sys_import",
      "d) start / sys_start",
      "e) run / execve"
    ],
    answer: 1,
    explanation: "리눅스에서 커널 모듈을 적재하는 명령어는 `insmod`이며, 내부적으로 `init_module` (또는 `finit_module`) 시스템 콜을 호출합니다."
  },
  {
    id: 35,
    category: "Hardware-based Security",
    question: "Samsung Knox의 TIMA(TrustZone-based Integrity Management Architecture)의 역할은?",
    options: [
      "a) 배터리 수명을 연장한다.",
      "b) TrustZone을 이용하여 리눅스 커널의 무결성을 주기적으로 감시하고 보호한다.",
      "c) 화면의 밝기를 조절한다.",
      "d) 클라우드에 데이터를 백업한다.",
      "e) 안드로이드 앱의 UI를 관리한다."
    ],
    answer: 1,
    explanation: "TIMA는 TrustZone(Secure World) 내에서 동작하며, Normal World의 리눅스 커널 코드나 데이터가 변조되었는지 감시하고, 권한 상승 공격 등을 방어하는 역할을 합니다."
  },
  {
    id: 36,
    category: "Cache Attacks",
    question: "Meltdown 및 Spectre 공격에서 비밀 정보를 추출하기 위해 공통적으로 사용하는 부채널(Side-Channel)은?",
    options: [
      "a) 전력 분석 (Power Analysis)",
      "b) 전자기파 분석 (EM Analysis)",
      "c) 캐시 타이밍 분석 (Cache Timing Analysis)",
      "d) 소리 분석 (Acoustic Analysis)",
      "e) 오류 주입 (Fault Injection)"
    ],
    answer: 2,
    explanation: "두 공격 모두 CPU 내부의 마이크로아키텍처 상태 변화(캐시 적재 여부)를 시간 차이(Flush+Reload 등)로 측정하여 데이터를 유출합니다."
  },
  {
    id: 37,
    category: "Software Defense",
    question: "Stack Canary 우회 기법 중, 공격자가 카나리 값을 알아내지 않고도 함수 반환 주소를 변조하지 못하게 하는 카나리 검사를 우회하는 방법은?",
    options: [
      "a) Brute Force",
      "b) Format String Attack으로 카나리 읽기",
      "c) Exception Handler(SEH) 덮어쓰기 (Windows)",
      "d) 스택의 높은 주소에서 낮은 주소로 덮어쓰기",
      "e) NOP Sled 사용"
    ],
    answer: 2,
    explanation: "Stack Canary는 반환 주소 앞에 위치하지만, 버퍼 오버플로우로 예외 처리기(SEH) 포인터를 덮어쓰면, 카나리 검사가 수행되기 전에 예외가 발생하여 공격자 코드로 제어가 넘어갈 수 있습니다 (SafeSEH/SEHOP 이전)."
  },
  {
    id: 38,
    category: "Hardware-based Security",
    question: "Intel SGX Enclave의 메모리 보호 방식에 대한 설명으로 틀린 것은?",
    options: [
      "a) MEE(Memory Encryption Engine)가 메모리에 쓰기 전 데이터를 암호화한다.",
      "b) CPU 패키지 내부(캐시 등)에서는 데이터가 평문으로 존재한다.",
      "c) 물리적 공격자가 RAM을 덤프해도 데이터를 읽을 수 없다.",
      "d) 운영체제는 Enclave 메모리의 암호화 키를 관리한다.",
      "e) 무결성 트리(Integrity Tree)를 사용하여 Replay Attack을 방지한다."
    ],
    answer: 3,
    explanation: "SGX의 암호화 키는 프로세서 내부에 하드웨어적으로 보호되며, 운영체제나 하이퍼바이저조차도 이 키에 접근하거나 관리할 수 없습니다."
  },
  {
    id: 39,
    category: "TEE (Trusted Execution Environment)",
    question: "GlobalPlatform TEE 표준에서 'Trusted Application(TA)'이 접근할 수 있는 API는?",
    options: [
      "a) Win32 API",
      "b) POSIX API",
      "c) TEE Internal API",
      "d) Java Swing API",
      "e) DirectX API"
    ],
    answer: 2,
    explanation: "GlobalPlatform 표준에 따르면, TEE 내부에서 실행되는 Trusted Application은 'TEE Internal API'를 통해 TEE의 기능(암호화, 보안 저장소 등)을 사용합니다."
  },
  {
    id: 40,
    category: "Hardware-based Security",
    question: "ARM TrustZone 환경에서 인터럽트(Interrupt) 처리 방식에 대한 설명으로 옳은 것은?",
    options: [
      "a) Secure World는 인터럽트를 전혀 받지 않는다.",
      "b) 일반적으로 FIQ(Fast Interrupt Request)는 Secure World로 라우팅되어 보안 관련 처리에 사용된다.",
      "c) 모든 인터럽트는 Normal World에서만 처리된다.",
      "d) IRQ는 항상 Secure World에서 처리된다.",
      "e) 인터럽트 처리는 소프트웨어적으로만 구현된다."
    ],
    answer: 1,
    explanation: "일반적으로 TrustZone 설정에서 FIQ는 Secure World(EL3/Monitor)로 라우팅되어 보안 작업이나 월드 간 전환에 사용되고, IRQ는 Normal World(OS)에서 처리하도록 구성합니다."
  },
  {
    id: 41,
    category: "Software Defense",
    question: "포맷 스트링 버그(Format String Bug)를 이용하여 메모리 내용을 읽거나 쓸 수 있는 이유는?",
    options: [
      "a) printf 함수의 인자 개수 검증 부재",
      "b) 스택 카나리의 부재",
      "c) ASLR의 미적용",
      "d) 버퍼 오버플로우 발생",
      "e) 정수 오버플로우 발생"
    ],
    answer: 0,
    explanation: "printf(buf)와 같이 포맷 스트링 인자를 제대로 지정하지 않으면, 공격자가 %x, %n 등의 포맷 지정자를 입력하여 스택의 데이터를 읽거나(Information Leak) 특정 주소에 값을 쓸 수 있습니다."
  },
  {
    id: 42,
    category: "Hardware-based Security",
    question: "Intel의 'Ring' 구조에서 가장 권한이 높은(가장 강력한) 레벨은 전통적으로 무엇이었으며, 가상화 및 ME 도입 이후 더 높은 권한을 지칭하는 용어는?",
    options: [
      "a) Ring 3",
      "b) Ring 0 (Kernel), Ring -1 (Hypervisor), Ring -3 (ME)",
      "c) Ring 1",
      "d) Ring 5",
      "e) User Mode"
    ],
    answer: 1,
    explanation: "전통적으로 Ring 0가 커널로 가장 높았으나, 하이퍼바이저(Ring -1), SMM(Ring -2), 그리고 Intel ME(Ring -3)와 같이 더 깊은 수준의 권한 계층이 존재합니다."
  },
  {
    id: 43,
    category: "OS Kernel Security",
    question: "x86 아키텍처에서 페이지 디렉토리 베이스 주소를 담고 있는 레지스터는?",
    options: [
      "a) EAX",
      "b) ESP",
      "c) EIP",
      "d) CR3",
      "e) CS"
    ],
    answer: 3,
    explanation: "CR3 레지스터(Control Register 3)는 현재 프로세스의 페이지 디렉토리(또는 페이지 맵 레벨 4)의 물리 주소를 저장하고 있어 가상 메모리 변환의 시작점이 됩니다."
  },
  {
    id: 44,
    category: "Hardware-based Security",
    question: "Intel의 PTD(Protected Transaction Display) 기술의 주된 목적은?",
    options: [
      "a) 화면 해상도 향상",
      "b) 스크린 스크래핑(Screen Scraping) 방지 및 안전한 PIN 입력",
      "c) 3D 그래픽 가속",
      "d) 모니터 전력 절감",
      "e) 터치스크린 감도 향상"
    ],
    answer: 1,
    explanation: "PTD는 화면의 특정 영역(예: PIN 입력 키패드)을 암호화하여 GPU로 전송하고, OS나 악성코드가 해당 화면 내용을 캡처(스크래핑)하거나 입력값을 가로채지 못하게 합니다."
  },
  {
    id: 45,
    category: "Cache Attacks",
    question: "Spectre 공격을 완화하기 위한 소프트웨어적 대책 중 하나인 'Retpoline'의 역할은?",
    options: [
      "a) 스택 카나리를 추가한다.",
      "b) 간접 분기(Indirect Branch)를 리턴(Return) 명령어로 대체하여 분기 예측을 방해한다.",
      "c) 캐시를 주기적으로 비운다.",
      "d) 커널 메모리 매핑을 해제한다.",
      "e) 트랜잭션 메모리를 비활성화한다."
    ],
    answer: 1,
    explanation: "Retpoline(Return Trampoline)은 간접 분기 명령을 리턴 명령으로 바꾸어 CPU의 분기 예측기가 투기적 실행을 하지 못하도록(또는 무한루프 등에 빠지게 하여) 유도하는 기법입니다."
  },
  {
    id: 46,
    category: "Hardware-based Security",
    question: "ARM TrustZone에서 'Secure Boot'가 보장하려는 것은?",
    options: [
      "a) 부팅 속도 최적화",
      "b) 부팅 시 실행되는 각 단계의 이미지(Bootloader, OS 등)의 무결성 및 서명 검증",
      "c) 네트워크 부팅 지원",
      "d) 여러 운영체제 멀티부팅",
      "e) 전원 차단 시 데이터 저장"
    ],
    answer: 1,
    explanation: "Secure Boot는 신뢰의 뿌리(Root of Trust)에서 시작하여 각 부팅 단계의 바이너리가 서명된(인증된) 것인지 검증하여, 변조된 펌웨어나 OS가 실행되는 것을 막습니다."
  },
  {
    id: 47,
    category: "OS Kernel Security",
    question: "프로세스의 가상 메모리 공간 중 초기화되지 않은 전역 변수가 저장되는 영역은?",
    options: [
      "a) Text Segment",
      "b) Data Segment",
      "c) BSS Segment",
      "d) Heap",
      "e) Stack"
    ],
    answer: 2,
    explanation: "BSS(Block Started by Symbol) 영역은 초기화되지 않은 전역 변수나 정적(static) 변수가 저장되는 공간으로, 프로그램 실행 시 0으로 초기화됩니다."
  },
  {
    id: 48,
    category: "Software Defense",
    question: "ASLR이 적용된 시스템에서 공격자가 메모리 주소를 알아내기 위해 사용하는 기법이 아닌 것은?",
    options: [
      "a) Brute Force (32bit 시스템 등 엔트로피가 낮은 경우)",
      "b) Information Leak (포맷 스트링 버그 등)",
      "c) NOP Sled (주소 오차 범위 허용)",
      "d) Heap Spraying (특정 코드로 힙을 채움)",
      "e) 정적 분석 (소스코드만 보고 주소 확정)"
    ],
    answer: 4,
    explanation: "ASLR이 적용되면 실행 시마다 주소가 바뀌므로, 소스코드만 보고 고정된 주소를 알아내는 정적 분석으로는 공격 주소를 확정할 수 없습니다."
  },
  {
    id: 49,
    category: "Hardware-based Security",
    question: "Rowhammer 공격은 하드웨어의 어떤 특성을 악용하는가?",
    options: [
      "a) 캐시 타이밍 차이",
      "b) DRAM 셀의 밀집도와 전기적 간섭(Leakage)",
      "c) CPU 파이프라인의 비순차 실행",
      "d) 하드디스크의 회전 속도",
      "e) 네트워크 카드의 버퍼 오버플로우"
    ],
    answer: 1,
    explanation: "Rowhammer는 DRAM의 특정 행(Row)을 반복적으로 빠르게 접근(Hammering)하여 인접한 행의 비트가 전기적 간섭으로 인해 반전(Bit flip)되는 현상을 이용합니다. (문서에는 명시되지 않았으나 하드웨어 보안의 중요 주제)"
  },
  {
    id: 50,
    category: "Software Defense",
    question: "C++의 vtable(Virtual Method Table)을 덮어쓰는 공격을 방어하기 위한 기법은?",
    options: [
      "a) DEP",
      "b) Stack Canary",
      "c) CFI (Control Flow Integrity)",
      "d) ASLR",
      "e) SafeSEH"
    ],
    answer: 2,
    explanation: "CFI(Control Flow Integrity)는 프로그램의 실행 흐름이 의도된 제어 흐름 그래프(CFG)를 따르는지 검증하여, vtable 변조 등을 통한 간접 분기 악용을 방어합니다."
  }
];

export default function QuizPage6() {
  return (
    <QuizTemplate 
      title="소프트웨어 및 시스템 보안" 
      subtitle="Total Quiz 1"
      quizData={quizData} 
    />
  );
}