import QuizTemplate from './QuizTemplate'; // 위에서 만든 파일 경로

// ----------------------------------------------------------------------
// DATA: 퀴즈 데이터 (PDF 내용 기반)
// ----------------------------------------------------------------------
const quizData = [
  {
    id: 1,
    category: "Hardware & System Security",
    question: "Intel CPU의 보안 기능 중, 커널 모드(Supervisor Mode)에서 유저 모드(User Mode)의 코드를 실행하는 것을 방지하여 Return-to-User 공격을 막는 기술은 무엇인가?",
    options: [
      "a) SMAP (Supervisor Mode Access Prevention)",
      "b) SMEP (Supervisor Mode Execution Prevention)",
      "c) MPX (Memory Protection Extensions)",
      "d) SGX (Software Guard Extensions)"
    ],
    answer: 1,
    explanation: "SMEP는 커널 모드(Supervisor Mode)에서 유저 영역(User Mode)의 페이지에 있는 코드를 실행(Execution)하는 것을 방지하여, 공격자가 유저 영역에 심어둔 악성 코드로 점프하는 공격을 차단합니다."
  },
  {
    id: 2,
    category: "Hardware & System Security",
    question: "SMAP(Supervisor Mode Access Prevention) 기능이 활성화되어 있을 때, 커널이 유저 공간의 데이터에 접근하려고 하면 어떤 결과가 발생하는가?",
    options: [
      "a) 데이터가 0으로 읽힌다.",
      "b) 정상적으로 읽힌다.",
      "c) 접근 위반 예외(Fault/Exception)가 발생한다.",
      "d) 시스템이 즉시 재부팅된다."
    ],
    answer: 2,
    explanation: "SMAP가 활성화되면 커널이 유저 영역의 데이터에 접근(읽기/쓰기)하려고 할 때 CPU가 이를 감지하고 예외(Fault/Exception)를 발생시킵니다."
  },
  {
    id: 3,
    category: "Hardware & System Security",
    question: "공격자가 커널 권한을 탈취한 후, SMEP나 SMAP 기능을 우회하기 위해 조작하는 제어 레지스터(Control Register)는 무엇인가?",
    options: [
      "a) CR0",
      "b) CR2",
      "c) CR3",
      "d) CR4"
    ],
    answer: 3,
    explanation: "SMEP와 SMAP 기능의 활성화 여부는 CR4 제어 레지스터의 20번(SMEP)과 21번(SMAP) 비트에 의해 제어됩니다. 공격자는 이를 무력화하기 위해 CR4 값을 조작하려 시도합니다."
  },
  {
    id: 4,
    category: "Hardware & System Security",
    question: "Intel MPX(Memory Protection Extensions)가 도입된 주된 목적은 무엇인가?",
    options: [
      "a) 커널 영역 보호",
      "b) 포인터의 경계(Bound) 검사를 통한 버퍼 오버플로우 방지",
      "c) 코드 암호화",
      "d) 섀도우 스택 구현"
    ],
    answer: 1,
    explanation: "Intel MPX는 포인터가 할당된 메모리 영역(Bound)을 벗어나는지 하드웨어적으로 검사하여 버퍼 오버플로우와 같은 메모리 오류를 막기 위해 도입되었습니다."
  },
  {
    id: 5,
    category: "Hardware & System Security",
    question: "Intel MPX 기술이 최신 CPU나 GCC 등에서 제거(deprecated)된 가장 큰 이유는?",
    options: [
      "a) 보안성이 너무 낮아서",
      "b) 소프트웨어 기반 검사 대비 성능/비용 효율이 떨어져서",
      "c) 하드웨어 구현이 불가능해서",
      "d) 라이선스 문제 때문에"
    ],
    answer: 1,
    explanation: "MPX는 전용 레지스터와 명령어를 사용했으나, 소프트웨어 기반 방식(예: Address Sanitizer)에 비해 성능 향상이 크지 않고 구현 복잡도가 높아 최신 시스템에서 제거되었습니다."
  },
  {
    id: 6,
    category: "Hardware & System Security",
    question: "Intel MPK(Memory Protection Keys)는 페이지 테이블 엔트리의 남는 비트를 활용하여 메모리를 몇 개의 도메인(Domain)으로 구분하는가?",
    options: [
      "a) 4개",
      "b) 8개",
      "c) 16개",
      "d) 32개"
    ],
    answer: 2,
    explanation: "Intel MPK는 페이지 테이블 엔트리의 남는 4비트를 보호 키(Protection Key)로 사용하여 메모리 페이지를 총 16개의 도메인으로 구분합니다."
  },
  {
    id: 7,
    category: "Hardware & System Security",
    question: "기존 mprotect() 시스템 콜 대신 Intel MPK를 사용할 때의 가장 큰 장점은 무엇인가?",
    options: [
      "a) TLB 플러시(Flush) 없이 권한 변경이 가능하여 성능이 빠르다.",
      "b) 커널 모드 진입이 필요 없다.",
      "c) 물리 메모리를 더 많이 사용할 수 있다.",
      "d) 암호화 기능을 제공한다."
    ],
    answer: 0,
    explanation: "mprotect()와 달리 MPK는 레지스터(PKRU) 값만 변경하면 즉시 권한이 적용되므로, 시스템 콜 호출이나 값비싼 TLB 플러시 과정이 필요 없어 매우 빠릅니다."
  },
  {
    id: 8,
    category: "Hardware & System Security",
    question: "강의 자료에서 언급된 OpenSSL의 'Heartbleed' 취약점을 방어하기 위해 MPK를 활용하는 방법으로 적절한 것은?",
    options: [
      "a) 통신 패킷을 암호화한다.",
      "b) 민감한 키가 저장된 메모리 영역을 도메인으로 설정하고, 사용하지 않을 때는 접근 권한을 잠근다.",
      "c) 모든 메모리를 읽기 전용으로 만든다.",
      "d) 서버를 재부팅한다."
    ],
    answer: 1,
    explanation: "Heartbleed는 과도한 메모리 읽기 취약점입니다. 민감한 데이터 영역을 MPK로 평소에 잠가두면, 취약점을 통해 해당 영역을 읽으려 할 때 하드웨어가 접근을 차단합니다."
  },
  {
    id: 9,
    category: "Hardware & System Security",
    question: "ARM Pointer Authentication (PAC)은 64비트 주소 체계 중 어느 부분을 활용하여 인증 코드를 저장하는가?",
    options: [
      "a) 하위 16비트",
      "b) 중간 16비트",
      "c) 사용하지 않는 상위 비트 (Top bits)",
      "d) 별도의 레지스터"
    ],
    answer: 2,
    explanation: "64비트 주소 체계에서 실제 주소로 사용되지 않는 상위 비트(Top bits) 공간에 인증 태그(PAC)를 저장하여 무결성을 검증합니다."
  },
  {
    id: 10,
    category: "Hardware & System Security",
    question: "ARM PAC에서 포인터의 무결성을 검증하기 위해 사용하는 명령어 쌍은?",
    options: [
      "a) PUSH/POP",
      "b) PAC/AUT",
      "c) ENC/DEC",
      "d) SIGN/VERIFY"
    ],
    answer: 1,
    explanation: "포인터에 인증 코드를 생성 및 삽입하는 PAC 명령어와, 사용하기 전에 코드를 검증하는 AUT 명령어를 쌍으로 사용합니다."
  },
  {
    id: 11,
    category: "Hardware & System Security",
    question: "ARM MTE(Memory Tagging Extension)가 메모리 안전성을 검사하는 기본 원리는?",
    options: [
      "a) 메모리 주소 전체를 암호화한다.",
      "b) 포인터의 태그(Color)와 메모리 영역의 태그가 일치하는지 하드웨어가 검사한다.",
      "c) 소프트웨어가 매번 경계를 검사한다.",
      "d) 섀도우 스택을 사용한다."
    ],
    answer: 1,
    explanation: "MTE는 포인터의 상위 비트에 저장된 태그와 실제 메모리 주소에 할당된 태그(Color)가 일치하는지 하드웨어가 접근 시마다 검사하는 방식입니다."
  },
  {
    id: 12,
    category: "Hardware & System Security",
    question: "ARM MTE가 방어할 수 있는 공격 유형 중, 메모리가 해제된(Free) 후 다시 접근하는 것을 탐지하는 것은 어떤 안전성 위반(Violation)에 해당하는가?",
    options: [
      "a) Spatial Safety (공간적 안전성)",
      "b) Temporal Safety (시간적 안전성)",
      "c) Type Safety (타입 안전성)",
      "d) Thread Safety (스레드 안전성)"
    ],
    answer: 1,
    explanation: "메모리 해제(Free) 시 태그를 변경하면, 이전에 가지고 있던 포인터(구 태그)로 접근할 때 태그 불일치가 발생합니다. 이는 시간차를 이용한 Use-After-Free 공격(Temporal Safety Violation)을 방어합니다."
  },
  {
    id: 13,
    category: "Hardware & System Security",
    question: "Intel CET(Control-flow Enforcement Technology)의 두 가지 핵심 기술은 무엇인가?",
    options: [
      "a) SMEP와 SMAP",
      "b) Shadow Stack과 Indirect Branch Tracking (IBT)",
      "c) SGX와 TXT",
      "d) MPX와 MPK"
    ],
    answer: 1,
    explanation: "Intel CET는 리턴 주소 변조를 막는 Shadow Stack과 간접 분기(Indirect Branch) 영역의 유효성을 검사하는 Indirect Branch Tracking 두 가지 기술로 구성됩니다."
  },
  {
    id: 14,
    category: "Hardware & System Security",
    question: "Intel CET의 Shadow Stack은 무엇을 보호하기 위해 사용되는가?",
    options: [
      "a) 함수의 매개변수",
      "b) 지역 변수",
      "c) 함수의 리턴 주소 (Return Address)",
      "d) 힙(Heap) 데이터"
    ],
    answer: 2,
    explanation: "Shadow Stack은 함수 호출 시 리턴 주소를 별도의 안전한 스택에 복사해 두고, 리턴 시 원본 스택의 주소와 비교하여 변조 여부를 확인합니다."
  },
  {
    id: 15,
    category: "Hardware & System Security",
    question: "Intel CET의 Indirect Branch Tracking (IBT)에서, 유효한 분기 타겟(Target)임을 표시하기 위해 사용되는 새로운 명령어는?",
    options: [
      "a) NOP",
      "b) ENDBRANCH",
      "c) JMP",
      "d) CALL"
    ],
    answer: 1,
    explanation: "IBT 기술에서 간접 분기(JMP/CALL)의 도착점(Target)에는 반드시 ENDBRANCH 명령어가 있어야 하며, 그렇지 않으면 예외가 발생합니다."
  },
  {
    id: 16,
    category: "Hardware & System Security",
    question: "TEE(Trusted Execution Environment)의 정의로 가장 적절한 것은?",
    options: [
      "a) 바이러스 백신 프로그램",
      "b) 일반 OS와 격리되어 보안이 보장되는 실행 환경 (Secure World)",
      "c) 네트워크 방화벽",
      "d) 암호화된 하드디스크"
    ],
    answer: 1,
    explanation: "TEE는 스마트폰이나 PC의 일반 OS(Rich OS)와 분리된 독립적인 하드웨어/소프트웨어 환경으로, 민감한 데이터와 코드를 안전하게 실행합니다."
  },
  {
    id: 17,
    category: "Hardware & System Security",
    question: "ARM TrustZone 아키텍처에서 시스템을 두 개의 상태로 나누는데, 이 두 상태의 명칭은?",
    options: [
      "a) User World / Kernel World",
      "b) Real World / Virtual World",
      "c) Normal World / Secure World",
      "d) Public World / Private World"
    ],
    answer: 2,
    explanation: "ARM TrustZone은 하드웨어를 논리적으로 분할하여 일반 앱이 실행되는 Normal World와 보안 앱이 실행되는 Secure World로 나눕니다."
  },
  {
    id: 18,
    category: "Hardware & System Security",
    question: "ARM TrustZone에서 현재 프로세서가 Secure 상태인지 Non-Secure 상태인지를 결정하는 비트(NS-bit)는 어디에 저장되는가?",
    options: [
      "a) PC (Program Counter)",
      "b) SCR (Secure Configuration Register)",
      "c) SP (Stack Pointer)",
      "d) CPSR"
    ],
    answer: 1,
    explanation: "CP15의 SCR 레지스터에 있는 NS-bit(Non-Secure bit)가 0이면 Secure 상태, 1이면 Non-Secure 상태를 나타냅니다."
  },
  {
    id: 19,
    category: "Hardware & System Security",
    question: "Normal World에서 Secure World로 전환하기 위해 사용하는 특별한 명령어는 무엇인가?",
    options: [
      "a) SYSCALL",
      "b) SMC (Secure Monitor Call)",
      "c) SWI",
      "d) HVC"
    ],
    answer: 1,
    explanation: "Normal World에서 Secure World의 서비스를 요청하거나 진입하기 위해 사용하는 어셈블리 명령어는 SMC 입니다."
  },
  {
    id: 20,
    category: "Hardware & System Security",
    question: "TrustZone 환경에서 Normal World와 Secure World 간의 문맥 교환(Context Switch)을 담당하는 특수한 CPU 모드는?",
    options: [
      "a) User Mode",
      "b) System Mode",
      "c) Monitor Mode",
      "d) Hypervisor Mode"
    ],
    answer: 2,
    explanation: "Monitor Mode는 Secure World에 속하며, 두 월드(Normal/Secure) 간의 컨텍스트 스위칭(전환)을 중재하는 역할을 합니다."
  },
  {
    id: 21,
    category: "Hardware & System Security",
    question: "다음 중 하드웨어 기반의 보안 모듈(TPM, Smart Card 등)의 단점으로 언급된 것은?",
    options: [
      "a) 보안성이 낮다.",
      "b) 비용(Cost)이 증가하고 유연성이 떨어진다.",
      "c) 전력 소모가 0이다.",
      "d) 소프트웨어만으로 구현 가능하다."
    ],
    answer: 1,
    explanation: "별도의 보안 칩(TPM, Smart Card 등)을 추가하는 것은 하드웨어 비용을 증가시키며, 펌웨어 업데이트 등 유지보수가 소프트웨어 방식보다 어렵습니다."
  },
  {
    id: 22,
    category: "Hardware & System Security",
    question: "TPM (Trusted Platform Module) 내부에 시스템 부팅 과정의 측정값(해시)을 누적하여 저장하는 레지스터는 무엇인가?",
    options: [
      "a) GPR",
      "b) PCR (Platform Configuration Register)",
      "c) MSR",
      "d) CR3"
    ],
    answer: 1,
    explanation: "TPM 내부의 PCR은 부팅 단계별 소프트웨어의 해시값을 누적(Extend)하여 시스템의 무결성 상태를 저장하는 레지스터입니다."
  },
  {
    id: 23,
    category: "Hardware & System Security",
    question: "Secure Boot와 Authenticated Boot의 차이점은 무엇인가?",
    options: [
      "a) 차이가 없다.",
      "b) Secure Boot는 검증 실패 시 부팅을 중단하고, Authenticated Boot는 측정값을 기록(TPM 등)하고 진행한다.",
      "c) Authenticated Boot가 더 강력하여 무조건 전원을 끈다.",
      "d) Secure Boot는 소프트웨어 방식이다."
    ],
    answer: 1,
    explanation: "Secure Boot는 실행을 차단(Enforce)하는 데 중점을 두며, Authenticated Boot는 상태를 측정(Measure)하여 나중에 검증(Attestation)하는 데 중점을 둡니다."
  },
  {
    id: 24,
    category: "Hardware & System Security",
    question: "인텔 ME(Management Engine)는 메인 CPU와 별도로 동작하는 독립된 마이크로컨트롤러이다. 주로 어디에 위치하는가?",
    options: [
      "a) RAM 내부",
      "b) 칩셋 (PCH/MCH) 내부",
      "c) 하드디스크",
      "d) 그래픽 카드"
    ],
    answer: 1,
    explanation: "Intel ME(Management Engine)는 메인보드의 칩셋(PCH 등) 내부에 통합된 별도의 마이크로컨트롤러입니다."
  },
  {
    id: 25,
    category: "Hardware & System Security",
    question: "인텔 ME의 특징으로 올바르지 않은 것은?",
    options: [
      "a) 메인 OS와 독립적으로 동작한다.",
      "b) 전원이 꺼져 있어도(대기 전력 상태) 동작할 수 있다.",
      "c) 메인 CPU의 메모리에 접근할 수 없다. (접근 가능함, DMA 등 사용)",
      "d) 펌웨어는 디지털 서명되어 있다."
    ],
    answer: 2,
    explanation: "Intel ME는 DMA(Direct Memory Access) 등을 통해 메인 CPU의 메모리에 접근할 수 있으며, 네트워크 인터페이스도 직접 제어할 수 있습니다."
  },
  {
    id: 26,
    category: "Hardware & System Security",
    question: "Intel SGX(Software Guard Extensions)가 보호하는 메모리 영역을 무엇이라고 부르는가?",
    options: [
      "a) Zone",
      "b) Container",
      "c) Enclave",
      "d) Sandbox"
    ],
    answer: 2,
    explanation: "Intel SGX에서 애플리케이션의 비밀 코드와 데이터를 담고 있는 보호된 메모리 영역을 Enclave라고 부릅니다."
  },
  {
    id: 27,
    category: "Hardware & System Security",
    question: "Intel SGX의 주된 위협 모델(Threat Model)에서, SGX가 신뢰하지 않는 대상(공격자로 가정하는 대상)에 포함되는 것은?",
    options: [
      "a) 오직 네트워크 해커",
      "b) OS(운영체제) 및 하이퍼바이저와 같은 특권 소프트웨어",
      "c) SGX 내부 코드",
      "d) CPU 패키지"
    ],
    answer: 1,
    explanation: "SGX는 OS나 하이퍼바이저가 악의적이거나 침해당했더라도 Enclave 내부의 데이터를 보호할 수 있도록 설계되었습니다."
  },
  {
    id: 28,
    category: "Hardware & System Security",
    question: "Intel IPT(Identity Protection Technology)의 기능 중, 스크린 캡처 공격을 막기 위해 핀(PIN) 입력 화면을 랜덤하게 보여주고 보호하는 기술은?",
    options: [
      "a) OTP",
      "b) PTD (Protected Transaction Display)",
      "c) SGX",
      "d) TXT"
    ],
    answer: 1,
    explanation: "PTD는 핀 입력 시 화면 캡처(Screen Scraping) 공격을 막기 위해, 랜덤한 키패드를 보안 디스플레이 채널을 통해 보여주는 기술입니다."
  },
  {
    id: 29,
    category: "Hardware & System Security",
    question: "Intel TSX(Transactional Synchronization Extensions)를 이용한 부채널 공격(Side-channel attack)은 주로 무엇을 알아내기 위해 사용되었는가? (KASLR 우회 관련)",
    options: [
      "a) 커널 메모리의 데이터 값",
      "b) 커널 주소 공간의 매핑 여부 (Timing 차이 이용)",
      "c) 사용자의 비밀번호",
      "d) CPU의 온도"
    ],
    answer: 1,
    explanation: "TSX를 이용한 부채널 공격은 메모리 접근 시 발생하는 미세한 시간 차이(Timing)를 측정하여 KASLR(커널 주소 공간 배치 난수화)을 우회하고 커널 주소를 알아내는 데 사용되었습니다."
  },
  {
    id: 30,
    category: "Hardware & System Security",
    question: "오픈소스 TEE(Trusted Execution Environment) 구현체로, 리나로(Linaro)에서 관리하며 수업 실습에도 사용되는 것은?",
    options: [
      "a) Trusty",
      "b) OP-TEE",
      "c) Kinibi",
      "d) QSEE"
    ],
    answer: 1,
    explanation: "리나로(Linaro)에서 관리하는 오픈소스 TEE OS로, ARM TrustZone 환경에서 널리 사용되는 것은 OP-TEE입니다."
  },
  {
    id: 31,
    category: "Hardware & System Security",
    question: "OP-TEE 아키텍처에서 Normal World의 클라이언트가 TEE에 요청을 보낼 때 도움을 주는 데몬 프로세스의 이름은?",
    options: [
      "a) tee-supplicant",
      "b) tee-driver",
      "c) secure-monitor",
      "d) trustlet"
    ],
    answer: 0,
    explanation: "Normal World의 유저 공간에서 실행되며, TEE의 요청(RPC 등)을 처리하거나 TEE로 요청을 전달하는 헬퍼 데몬은 tee-supplicant 입니다."
  },
  {
    id: 32,
    category: "Hardware & System Security",
    question: "Normal World와 Secure World가 데이터를 주고받기 위해 주로 사용하는 메모리 영역은?",
    options: [
      "a) 스택(Stack)",
      "b) 힙(Heap)",
      "c) 공유 메모리 (Shared Memory)",
      "d) 레지스터 파일"
    ],
    answer: 2,
    explanation: "Normal World와 Secure World는 메모리가 분리되어 있지만, 데이터를 전달하기 위해 Non-secure 메모리 일부를 **공유 메모리(Shared Memory)**로 설정하여 통신합니다."
  },
  {
    id: 33,
    category: "Hardware & System Security",
    question: "ARM Trusted Firmware(TF-A)의 부팅 단계 중, 가장 먼저 실행되며 Boot ROM에 위치하는 단계는?",
    options: [
      "a) BL1",
      "b) BL2",
      "c) BL31",
      "d) BL33"
    ],
    answer: 0,
    explanation: "ARM Trusted Firmware의 부팅 과정에서 가장 먼저 실행되는 BL1은 SoC 제조 시 Boot ROM에 불변의 코드로 저장됩니다."
  },
  {
    id: 34,
    category: "Hardware & System Security",
    question: "삼성 Knox의 TIMA(TrustZone Integrity Management Architecture)가 하는 주된 역할은?",
    options: [
      "a) 사용자 데이터 백업",
      "b) 커널 무결성 모니터링 (커널 코드 및 페이지 테이블 보호)",
      "c) 배터리 관리",
      "d) 화면 밝기 조절"
    ],
    answer: 1,
    explanation: "삼성 TIMA는 TrustZone을 이용하여 리눅스 커널의 코드와 중요 데이터 구조(페이지 테이블 등)의 무결성을 실시간으로 감시하고 보호합니다."
  },
  {
    id: 35,
    category: "Hardware & System Security",
    question: "TIMA 구현 시, 리눅스 커널이 페이지 테이블을 직접 수정하지 못하게 막고, 누구에게 수정을 요청하는가?",
    options: [
      "a) 유저 어플리케이션",
      "b) TrustZone (Secure World)",
      "c) 하이퍼바이저",
      "d) 외부 서버"
    ],
    answer: 1,
    explanation: "TIMA 환경에서 커널은 페이지 테이블을 직접 수정할 권한이 없으며, 수정이 필요할 때 **TrustZone (Secure World)**에 요청하여 검증 후 대신 수행하게 합니다."
  },
  {
    id: 36,
    category: "Hardware & System Security",
    question: "TrustZone 환경에서 인터럽트(Interrupt)가 발생했을 때, Secure World로 강제로 진입시키기 위해 사용할 수 있는 인터럽트 유형은?",
    options: [
      "a) IRQ",
      "b) FIQ (Fast Interrupt Request)",
      "c) SError",
      "d) Virtual IRQ"
    ],
    answer: 1,
    explanation: "ARM TrustZone 환경에서는 FIQ를 Secure World 전용 인터럽트로 설정하여, Normal World 실행 중에도 강제로 Secure World로 진입하게 할 수 있습니다."
  },
  {
    id: 37,
    category: "Hardware & System Security",
    question: "TrustZone의 Secure World에서 실행되는 운영체제(OS)를 무엇이라고 부르는가?",
    options: [
      "a) Rich OS",
      "b) Trusted OS (Secure OS)",
      "c) Guest OS",
      "d) Host OS"
    ],
    answer: 1,
    explanation: "Secure World에서 실행되는 운영체제를 일반적으로 Trusted OS 또는 Secure OS라고 부르며, OP-TEE 등이 이에 해당합니다."
  },
  {
    id: 38,
    category: "Hardware & System Security",
    question: "OP-TEE에서 'Static TA(Trusted App)'와 'Dynamic TA'의 가장 큰 차이점은?",
    options: [
      "a) Static TA는 커널 모드에서 실행되고, Dynamic TA는 유저 모드에서 실행된다.",
      "b) Dynamic TA가 더 빠르다.",
      "c) Static TA는 암호화되지 않는다.",
      "d) 차이가 없다."
    ],
    answer: 0,
    explanation: "OP-TEE에서 Static TA는 TEE 커널과 함께 컴파일되어 커널 모드에서 실행되고, Dynamic TA는 파일 시스템에서 로드되어 유저 모드에서 실행됩니다."
  },
  {
    id: 39,
    category: "Hardware & System Security",
    question: "ARM 프로세서에서 SMC 명령어를 실행하면 CPU는 어떤 익셉션 레벨(Exception Level) 혹은 모드로 진입하는가?",
    options: [
      "a) EL0 (User)",
      "b) EL1 (Kernel)",
      "c) EL3 (Monitor)",
      "d) EL2 (Hypervisor)"
    ],
    answer: 2,
    explanation: "ARMv8 아키텍처에서 SMC 명령어를 실행하면 CPU는 가장 높은 권한 레벨 중 하나인 **EL3 (Monitor Mode)**로 진입하여 월드 간 전환을 수행합니다."
  },
  {
    id: 40,
    category: "Hardware & System Security",
    question: "스마트폰에서 지문 인식이나 결제 비밀번호 입력 시 TrustZone을 사용하는 주된 이유는?",
    options: [
      "a) 처리 속도가 빨라서",
      "b) Normal World(안드로이드 등)가 해킹되더라도 생체 정보나 비밀번호를 유출하지 않기 위해",
      "c) 배터리를 절약하기 위해",
      "d) UI를 예쁘게 만들기 위해"
    ],
    answer: 1,
    explanation: "TrustZone은 메인 OS와 격리된 환경이므로, 안드로이드가 악성코드에 감염되더라도 TrustZone 내부의 민감 정보(지문, 비밀번호)는 안전하게 보호됩니다."
  },
  {
    id: 41,
    category: "Hardware & System Security",
    question: "'Use-After-Free' 공격이란 무엇인가?",
    options: [
      "a) 메모리를 할당받지 않고 사용하는 공격",
      "b) 메모리 해제(Free) 후, 해당 포인터를 다시 사용하여 발생하는 취약점을 이용한 공격",
      "c) 공짜 소프트웨어를 사용하는 공격",
      "d) 무한 루프를 돌게 하는 공격"
    ],
    answer: 1,
    explanation: "프로그램이 메모리를 해제한 뒤에도 해당 포인터를 계속 사용할 때 발생하는 버그를 악용하여, 해제된 메모리에 악성 데이터를 주입하고 실행 흐름을 조작하는 공격입니다."
  },
  {
    id: 42,
    category: "Hardware & System Security",
    question: "Intel MPK에서 각 도메인에 대한 접근 권한(읽기/쓰기)을 제어하는 레지스터의 이름은?",
    options: [
      "a) PKRU",
      "b) CR3",
      "c) EFLAGS",
      "d) DR0"
    ],
    answer: 0,
    explanation: "Intel MPK에서 각 도메인(0~15)에 대한 읽기/쓰기 접근 권한을 제어하는 레지스터는 PKRU 입니다."
  },
  {
    id: 43,
    category: "Hardware & System Security",
    question: "다음 중 TEE(Trusted Execution Environment)의 구현 사례가 아닌 것은?",
    options: [
      "a) ARM TrustZone",
      "b) Intel SGX",
      "c) Docker Container",
      "d) TI M-Shield"
    ],
    answer: 2,
    explanation: "Docker Container는 OS 레벨의 가상화 기술로, 하드웨어 기반의 보안 격리를 제공하는 TEE(TrustZone, SGX, M-Shield 등)와는 다릅니다."
  },
  {
    id: 44,
    category: "Hardware & System Security",
    question: "보안 부팅(Secure Boot) 과정에서 각 단계의 이미지를 로드하기 전에 수행하는 작업은?",
    options: [
      "a) 압축 해제",
      "b) 디지털 서명 검증 (Integrity Check)",
      "c) 네트워크 연결",
      "d) 사용자 인증"
    ],
    answer: 1,
    explanation: "Secure Boot의 각 단계에서는 다음 단계의 부트로더나 이미지를 실행하기 전에 디지털 서명을 검증하여 변조되지 않았는지(무결성) 확인합니다."
  },
  {
    id: 45,
    category: "Hardware & System Security",
    question: "다음 중 'Temporal Safety Violation'(시간적 안전성 위반)에 해당하는 공격은?",
    options: [
      "a) Buffer Overflow",
      "b) Use-After-Free",
      "c) Integer Overflow",
      "d) Null Pointer Dereference"
    ],
    answer: 1,
    explanation: "Use-After-Free는 시간의 흐름에 따른 메모리 상태 변화(할당 -> 해제 -> 재사용)를 악용하는 것이므로 'Temporal Safety Violation'에 해당합니다."
  },
  {
    id: 46,
    category: "Hardware & System Security",
    question: "하드웨어 기반 보안 기술 중, 실행 흐름(Control Flow)을 보호하기 위한 기술이 아닌 것은?",
    options: [
      "a) Intel CET",
      "b) ARM PAC",
      "c) Stack Canary (소프트웨어 방식이지만 개념적으로)",
      "d) Intel TSX (Transactional Memory임)"
    ],
    answer: 3,
    explanation: "Intel CET, ARM PAC, Stack Canary는 모두 실행 흐름 변조를 막기 위한 기술입니다. 반면 Intel TSX는 성능 향상을 위한 트랜잭션 메모리 기술입니다."
  },
  {
    id: 47,
    category: "Hardware & System Security",
    question: "OP-TEE에서 Normal World의 리눅스 커널 드라이버가 Secure World로 요청을 보낼 때 사용하는 통신 방식은?",
    options: [
      "a) TCP/IP",
      "b) SMC (Secure Monitor Call)",
      "c) Bluetooth",
      "d) NFC"
    ],
    answer: 1,
    explanation: "Normal World의 커널 드라이버가 Secure World의 OP-TEE에게 서비스를 요청할 때, 하드웨어적으로 SMC 명령어를 사용하여 모니터 모드를 통해 통신합니다."
  },
  {
    id: 48,
    category: "Hardware & System Security",
    question: "삼성 Knox와 같은 모바일 보안 플랫폼에서 TrustZone을 이용하여 보호하는 대상이 아닌 것은?",
    options: [
      "a) 커널 코드 영역 (PKM)",
      "b) 사용자 비밀번호/생체정보",
      "c) 일반 게임 앱의 점수 데이터",
      "d) 암호화 키 (Keystore)"
    ],
    answer: 2,
    explanation: "TrustZone은 자원이 제한적이므로 커널 코드, 비밀번호, 암호화 키와 같은 매우 중요한 보안 자산을 보호하는 데 사용되며, 일반 앱의 데이터는 보호 대상이 아닙니다."
  },
  {
    id: 49,
    category: "Hardware & System Security",
    question: "인텔 SGX에서 Enclave 내의 코드가 실행될 때, OS나 하이퍼바이저가 해당 메모리를 덤프(Dump)하면 어떻게 보이는가?",
    options: [
      "a) 평문(Clear text)으로 보인다.",
      "b) 암호화된 상태로 보인다.",
      "c) 0으로 채워져 보인다.",
      "d) 접근 자체가 불가능하여 시스템이 멈춘다."
    ],
    answer: 1,
    explanation: "SGX는 Memory Encryption Engine을 사용하여 Enclave 페이지를 메모리에 쓸 때 암호화합니다. 따라서 OS가 덤프하더라도 암호화된 텍스트(Ciphertext)만 보입니다."
  },
  {
    id: 50,
    category: "Hardware & System Security",
    question: "ARM TrustZone 기반 시스템에서 Secure Boot의 신뢰의 기점(Root of Trust)이 되는 코드는 어디에 저장되는가?",
    options: [
      "a) HDD",
      "b) Boot ROM (수정 불가능한 하드웨어)",
      "c) SD 카드",
      "d) 클라우드 서버"
    ],
    answer: 1,
    explanation: "Secure Boot의 신뢰 사슬(Chain of Trust)의 시작점인 Root of Trust Code는 수정이 불가능한 하드웨어 영역인 SoC 내부의 Boot ROM에 저장됩니다."
  }
];

// ----------------------------------------------------------------------
// COMPONENTS
// ----------------------------------------------------------------------

export default function QuizPage4() {
  return (
    <QuizTemplate 
      title="소프트웨어 및 시스템 보안" 
      subtitle="Cache attack"
      quizData={quizData} 
    />
  );
}