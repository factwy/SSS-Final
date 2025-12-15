import QuizTemplate from './QuizTemplate';

const quizData = [
  {
    id: 1,
    category: "Software Defense",
    question: "스택 버퍼 오버플로우를 감지하기 위해 스택의 반환 주소 앞에 삽입하는 특수한 값은?",
    options: ["Stack Canary", "ASLR", "DEP", "RELRO", "ROP"],
    answer: 0,
    explanation: "Stack Canary(카나리)는 버퍼 오버플로우 발생 시 반환 주소가 덮어씌워지기 전에 변조됨을 감지하여 공격을 막는 기법입니다."
  },
  {
    id: 2,
    category: "Software Defense",
    question: "프로그램 실행 시마다 메모리 주소를 무작위로 변경하여 공격자가 주소를 예측하기 어렵게 만드는 기법은?",
    options: ["DEP", "ASLR", "Canary", "CFI", "KPTI"],
    answer: 1,
    explanation: "ASLR(Address Space Layout Randomization)은 스택, 힙, 라이브러리 등의 주소를 랜덤화하는 기법입니다."
  },
  {
    id: 3,
    category: "Software Defense",
    question: "데이터 영역(스택, 힙)에서 코드가 실행되는 것을 방지하는 기법은?",
    options: ["ASLR", "Canary", "DEP (NX Bit)", "RELRO", "MTE"],
    answer: 2,
    explanation: "DEP(Data Execution Prevention) 또는 NX(No-eXecute)는 데이터 영역을 실행 불가능하게 설정하여 쉘코드 실행을 차단합니다."
  },
  {
    id: 4,
    category: "Software Defense",
    question: "GOT(Global Offset Table)를 읽기 전용으로 만들어 덮어쓰기 공격을 방지하는 기법은?",
    options: [ "ROP", "JOP", "RELRO", "SMEP", "SMAP" ],
    answer: 2,
    explanation: "RELRO(Relocation Read-Only)는 프로그램 로드 후 GOT 영역을 읽기 전용으로 변경하여 변조를 막습니다."
  },
  {
    id: 5,
    category: "Hardware-based Security",
    question: "커널 모드에서 사용자 모드의 코드를 실수로 '실행'하는 것을 방지하는 Intel CPU의 기능은?",
    options: ["SMAP", "SMEP", "SGX", "MPX", "CET"],
    answer: 1,
    explanation: "SMEP(Supervisor Mode Execution Prevention)는 관리자(커널) 모드에서 유저 영역의 코드를 실행하는 것을 차단합니다."
  },
  {
    id: 6,
    category: "Hardware-based Security",
    question: "커널 모드에서 사용자 모드의 데이터에 의도치 않게 '접근(읽기/쓰기)'하는 것을 방지하는 Intel CPU의 기능은?",
    options: ["SMEP", "SMAP", "TXT", "TSX", "AES-NI"],
    answer: 1,
    explanation: "SMAP(Supervisor Mode Access Prevention)는 관리자(커널) 모드에서 유저 영역의 데이터에 접근하는 것을 차단합니다."
  },
  {
    id: 7,
    category: "Hardware-based Security",
    question: "포인터의 상위 비트에 서명(Tag)을 저장하여 포인터 변조를 탐지하는 ARM의 보안 기술은?",
    options: ["TrustZone", "PAC (Pointer Authentication)", "NEON", "Jazelle", "Thumb"],
    answer: 1,
    explanation: "PAC(Pointer Authentication Code)는 포인터의 남는 비트에 암호화 서명을 넣어 무결성을 검증합니다."
  },
  {
    id: 8,
    category: "Hardware-based Security",
    question: "메모리 할당 시 태그를 부여하여 Use-After-Free나 오버플로우를 하드웨어적으로 탐지하는 ARM 기술은?",
    options: ["MTE (Memory Tagging Extension)", "MPX", "CET", "SGX", "SEV"],
    answer: 0,
    explanation: "MTE(Memory Tagging Extension)는 포인터와 메모리 영역에 색깔(태그)을 부여하여 일치 여부를 검사합니다."
  },
  {
    id: 9,
    category: "Hardware-based Security",
    question: "ROP(Return Oriented Programming) 공격을 막기 위해 함수 리턴 주소를 별도로 저장하는 Intel 기술은?",
    options: ["Shadow Stack (CET)", "MPK", "SGX", "TXT", "ME"],
    answer: 0,
    explanation: "Intel CET의 Shadow Stack은 리턴 주소를 별도의 안전한 스택에 복사해 두었다가 함수 리턴 시 비교하여 변조를 감지합니다."
  },
  {
    id: 10,
    category: "Hardware-based Security",
    question: "간접 분기(Indirect Branch)가 의도된 위치로만 점프하도록 강제하여 JOP 공격을 막는 Intel 기술은?",
    options: ["Shadow Stack", "IBT (Indirect Branch Tracking)", "MPX", "TSX", "SMAP"],
    answer: 1,
    explanation: "Intel CET의 IBT(Indirect Branch Tracking)는 간접 분기 직후에 `ENDBRANCH` 명령어가 있는지 확인하여 흐름을 제어합니다."
  },
  {
    id: 11,
    category: "TEE (Trusted Execution Environment)",
    question: "프로세서를 'Secure World'와 'Normal World'로 분리하여 보안 환경을 제공하는 ARM의 기술은?",
    options: ["SGX", "TrustZone", "ME", "SEV", "TXT"],
    answer: 1,
    explanation: "ARM TrustZone은 하드웨어적으로 프로세서와 메모리를 보안(Secure) 영역과 일반(Normal) 영역으로 격리합니다."
  },
  {
    id: 12,
    category: "TEE (Trusted Execution Environment)",
    question: "운영체제조차 접근할 수 없는 애플리케이션 전용의 암호화된 메모리 공간(Enclave)을 제공하는 Intel 기술은?",
    options: ["TrustZone", "SGX (Software Guard Extensions)", "SMEP", "MPK", "VT-x"],
    answer: 1,
    explanation: "Intel SGX는 애플리케이션이 OS로부터도 격리된 안전한 실행 공간(Enclave)을 생성할 수 있게 합니다."
  },
  {
    id: 13,
    category: "Hardware-based Security",
    question: "시스템 부팅 과정의 무결성을 검증하기 위해 해시값을 저장하는 보안 칩은?",
    options: ["TPM (Trusted Platform Module)", "GPU", "FPGA", "DSP", "NPU"],
    answer: 0,
    explanation: "TPM은 부팅 단계별 측정값(해시)을 PCR에 저장하여 시스템이 변조되지 않았음을 증명(Attestation)합니다."
  },
  {
    id: 14,
    category: "Hardware-based Security",
    question: "PC 칩셋 내부에 존재하며 메인 CPU와 독립적으로 동작하여 원격 관리 등을 수행하는 Intel의 보안 엔진은?",
    options: ["Intel ME (Management Engine)", "Intel SGX", "Intel VT", "Intel MPX", "Intel TSX"],
    answer: 0,
    explanation: "Intel ME는 메인 OS와 무관하게 동작하는 별도의 펌웨어/하드웨어 시스템입니다."
  },
  {
    id: 15,
    category: "Cache Attacks",
    question: "CPU의 '비순차 실행(Out-of-Order Execution)' 취약점을 악용하여 커널 메모리를 읽는 공격은?",
    options: ["Spectre", "Meltdown", "Rowhammer", "Plundervolt", "Foreshadow"],
    answer: 1,
    explanation: "Meltdown은 비순차 실행 중 권한 검사가 지연되는 점을 악용하여 커널 메모리를 읽습니다."
  },
  {
    id: 16,
    category: "Cache Attacks",
    question: "CPU의 '분기 예측(Branch Prediction)'과 '투기적 실행'을 악용하여 정보를 유출하는 공격은?",
    options: ["Meltdown", "Spectre", "L1TF", "MDS", "Zombieload"],
    answer: 1,
    explanation: "Spectre는 분기 예측을 속여 CPU가 엉뚱한 코드를 투기적으로 실행하게 만듭니다."
  },
  {
    id: 17,
    category: "OS Kernel Security",
    question: "Meltdown 공격을 방어하기 위해 커널과 유저의 페이지 테이블을 분리하는 OS 패치는?",
    options: [ "KASLR", "KPTI (Kernel Page Table Isolation)", "DEP", "SMAP", "CFI" ],
    answer: 1,
    explanation: "KPTI는 유저 모드에서 커널 메모리 매핑을 제거하여 Meltdown 공격을 원천적으로 차단합니다."
  },
  {
    id: 18,
    category: "OS Kernel Security",
    question: "부팅 시마다 커널의 메모리 주소를 무작위로 변경하는 기법은?",
    options: ["ASLR", "KASLR (Kernel ASLR)", "DEP", "Canary", "SMEP"],
    answer: 1,
    explanation: "KASLR은 커널 코드와 데이터의 적재 위치를 랜덤화하여 커널 익스플로잇을 어렵게 만듭니다."
  },
  {
    id: 19,
    category: "OS Kernel Security",
    question: "자신의 존재를 숨기고 지속적인 접근을 유지하기 위해 설치되는 악성 커널 모듈은?",
    options: ["Ransomware", "Spyware", "Rootkit", "Adware", "Worm"],
    answer: 2,
    explanation: "Rootkit(루트킷)은 관리자 권한을 유지하며 프로세스나 파일 등을 숨기는 기능을 가진 악성코드입니다."
  },
  {
    id: 20,
    category: "OS Kernel Security",
    question: "커널 내부의 구조체(객체)를 직접 조작하여 프로세스를 숨기는 루트킷 기법은?",
    options: ["DKOM (Direct Kernel Object Manipulation)", "Hooking", "Injection", "Overflow", "Sniffing"],
    answer: 0,
    explanation: "DKOM은 커널 객체(예: 프로세스 리스트)를 직접 수정하여 탐지 도구를 속이는 기법입니다."
  },
  {
    id: 21,
    category: "Hardware-based Security",
    question: "유저 모드에서 페이지 테이블 수정 없이 메모리 권한(읽기/쓰기)을 빠르게 변경할 수 있는 Intel 기술은?",
    options: ["MPK (Memory Protection Keys)", "MPX", "SGX", "CET", "TXT"],
    answer: 0,
    explanation: "MPK는 PKRU 레지스터를 통해 유저 레벨에서 도메인별 메모리 접근 권한을 즉시 변경할 수 있습니다."
  },
  {
    id: 22,
    category: "Hardware-based Security",
    question: "포인터의 범위(Bounds)를 하드웨어적으로 검사하여 오버플로우를 막으려 했던 Intel 기술은? (현재는 단종 수순)",
    options: ["MPX (Memory Protection Extensions)", "SGX", "AVX", "SSE", "AES-NI"],
    answer: 0,
    explanation: "MPX는 포인터의 상한/하한을 레지스터에 저장하고 검사하는 기술이었습니다."
  },
  {
    id: 23,
    category: "Software Defense",
    question: "이미 메모리에 있는 코드 조각(Gadget)들을 연결하여 공격 코드를 구성하는 기법은?",
    options: ["ROP (Return Oriented Programming)", "Shellcode", "Heap Spray", "Brute Force", "Fuzzing"],
    answer: 0,
    explanation: "ROP는 'ret' 명령어로 끝나는 기존 코드 조각들을 체인처럼 엮어 원하는 동작을 수행합니다."
  },
  {
    id: 24,
    category: "Software Defense",
    question: "라이브러리에 있는 함수(예: system())를 호출하도록 리턴 주소를 조작하는 공격은?",
    options: ["Ret2libc (Return-to-libc)", "Shellcode", "Format String", "Race Condition", "DDoS"],
    answer: 0,
    explanation: "Ret2libc는 실행 권한이 있는 라이브러리 함수로 제어 흐름을 돌려 공격 코드를 실행하지 않고도 공격 목표를 달성합니다."
  },
  {
    id: 25,
    category: "Cache Attacks",
    question: "캐시 부채널 공격에서 특정 메모리 라인을 캐시에서 비우는 명령어는?",
    options: ["clflush", "mov", "add", "jmp", "nop"],
    answer: 0,
    explanation: "clflush(Cache Line Flush)는 지정된 주소의 데이터를 캐시에서 제거하여 메인 메모리로 보냅니다."
  },
  {
    id: 26,
    category: "Hardware-based Security",
    question: "화면의 특정 영역(PIN 입력기 등)을 암호화하여 스크린 캡처를 방지하는 Intel 기술은?",
    options: ["PTD (Protected Transaction Display)", "SGX", "VT-d", "Turbo Boost", "Hyper-V"],
    answer: 0,
    explanation: "PTD는 중요 입력 화면을 GPU 단계에서 암호화하여 OS나 악성코드가 화면을 훔쳐보는 것을 막습니다."
  },
  {
    id: 27,
    category: "TEE (Trusted Execution Environment)",
    question: "TrustZone에서 Secure World와 Normal World 간의 통신을 위해 사용하는 인터럽트는?",
    options: ["SMC (Secure Monitor Call)", "IRQ", "FIQ", "NMI", "Reset"],
    answer: 0,
    explanation: "SMC 명령어는 프로세서를 모니터 모드로 전환시켜 월드 간 전환을 요청합니다."
  },
  {
    id: 28,
    category: "TEE (Trusted Execution Environment)",
    question: "리눅스에서 실행되며 TEE(Trusted Execution Environment)의 요청을 돕는 유저 공간 데몬은?",
    options: ["tee-supplicant", "init", "systemd", "xserver", "bash"],
    answer: 0,
    explanation: "tee-supplicant는 Normal World에서 실행되면서 TEE가 필요로 하는 파일 로드 등의 작업을 대행합니다."
  },
  {
    id: 29,
    category: "OS Kernel Security",
    question: "리눅스에서 시스템 콜 테이블을 후킹하기 위해 해제해야 하는 CPU 보호 기능은?",
    options: [ "WP (Write Protect) bit in CR0", "NX bit", "ASLR", "Canary", "SMEP" ],
    answer: 0,
    explanation: "커널 메모리(텍스트/데이터)는 읽기 전용인 경우가 많아, CR0 레지스터의 WP 비트를 꺼야 수정이 가능합니다."
  },
  {
    id: 30,
    category: "Software Defense",
    question: "힙(Heap) 메모리 영역에 대량의 NOP와 쉘코드를 뿌려 공격 성공률을 높이는 기법은?",
    options: ["Heap Spraying", "Stack Overflow", "Use-After-Free", "Double Free", "Memory Leak"],
    answer: 0,
    explanation: "Heap Spraying은 힙 영역의 광범위한 주소에 공격 코드를 채워 넣어, 임의의 주소로 점프했을 때 쉘코드가 실행되도록 유도합니다."
  },
  {
    id: 31,
    category: "Cache Attacks",
    question: "Spectre 공격을 막기 위해 간접 분기를 리턴 명령으로 바꾸는 소프트웨어 패치는?",
    options: ["Retpoline", "KPTI", "Canary", "ASLR", "DEP"],
    answer: 0,
    explanation: "Retpoline(Return Trampoline)은 CPU의 분기 예측기가 투기적 실행을 하지 못하도록 유도하는 코드 구조입니다."
  },
  {
    id: 32,
    category: "TEE (Trusted Execution Environment)",
    question: "삼성 Knox에서 커널 무결성을 실시간으로 감시하는 TrustZone 기반 기술은?",
    options: ["TIMA", "SEAndroid", "Secure Boot", "Container", "VPN"],
    answer: 0,
    explanation: "TIMA(TrustZone-based Integrity Management Architecture)는 TrustZone 내에서 리눅스 커널을 감시합니다."
  },
  {
    id: 33,
    category: "Hardware-based Security",
    question: "Intel SGX에서 Enclave가 올바르게 생성되었음을 외부에 증명하는 과정은?",
    options: ["Remote Attestation", "Sealing", "Provisioning", "Encryption", "Signing"],
    answer: 0,
    explanation: "Remote Attestation은 Enclave의 해시값과 서명을 통해 해당 코드가 신뢰할 수 있는 하드웨어에서 실행 중임을 증명합니다."
  },
  {
    id: 34,
    category: "Hardware-based Security",
    question: "물리적 메모리(DRAM)의 특정 행을 반복 접근하여 인접 비트를 반전시키는 공격은?",
    options: ["Rowhammer", "Meltdown", "Spectre", "Cold Boot", "JTAG"],
    answer: 0,
    explanation: "Rowhammer는 메모리 셀 간의 전자기적 간섭을 이용해 데이터를 변조하는 하드웨어적 공격입니다."
  },
  {
    id: 35,
    category: "Software Defense",
    question: "프로그램의 제어 흐름이 의도된 그래프(CFG)대로만 이동하는지 검사하는 방어 기법은?",
    options: ["CFI (Control Flow Integrity)", "DEP", "ASLR", "Canary", "RELRO"],
    answer: 0,
    explanation: "CFI는 간접 분기 등의 타겟이 유효한지 검증하여 ROP/JOP 공격을 차단합니다."
  },
  {
    id: 36,
    category: "Hardware-based Security",
    question: "Intel TSX 트랜잭션이 충돌이나 예외로 인해 실패하는 것을 무엇이라 하는가?",
    options: ["Abort", "Commit", "Begin", "End", "Rollback"],
    answer: 0,
    explanation: "TSX 트랜잭션이 성공적으로 끝나지 못하면 Abort(중단)되고, 변경 사항은 반영되지 않습니다."
  },
  {
    id: 37,
    category: "OS Kernel Security",
    question: "초기화되지 않은 전역 변수가 저장되며, 0으로 채워지는 메모리 영역은?",
    options: ["BSS", "Text", "Data", "Heap", "Stack"],
    answer: 0,
    explanation: "BSS(Block Started by Symbol) 영역은 초기화되지 않은 변수를 위해 예약된 공간입니다."
  },
  {
    id: 38,
    category: "Hardware-based Security",
    question: "Secure Boot의 신뢰 사슬(Chain of Trust)이 시작되는, 수정 불가능한 하드웨어 지점은?",
    options: ["Root of Trust (RoT)", "BIOS", "Kernel", "Bootloader", "Disk"],
    answer: 0,
    explanation: "Root of Trust는 보안의 기점이 되는, 무조건적으로 신뢰해야 하는 하드웨어/펌웨어 요소입니다."
  },
  {
    id: 39,
    category: "Hardware-based Security",
    question: "Intel SGX가 메모리 롤백(Rollback) 공격을 방지하기 위해 사용하는 자료구조는?",
    options: ["Merkle Tree (Integrity Tree)", "Hash Table", "Linked List", "Binary Tree", "Stack"],
    answer: 0,
    explanation: "SGX는 메모리 무결성 트리(Merkle Tree)를 사용하여 데이터가 과거 시점으로 되돌려졌는지 확인합니다."
  },
  {
    id: 40,
    category: "TEE (Trusted Execution Environment)",
    question: "TrustZone에서 Secure World의 OS 역할을 하는 펌웨어는?",
    options: ["Trusted OS", "Rich OS", "Hypervisor", "Bootloader", "BIOS"],
    answer: 0,
    explanation: "Secure World에서는 보안 작업을 처리하는 Trusted OS(예: OP-TEE)가 실행됩니다."
  },
  {
    id: 41,
    category: "OS Kernel Security",
    question: "해제된 메모리 포인터를 다시 사용하여 발생하는 취약점은?",
    options: ["Use-After-Free (UAF)", "Double Free", "Memory Leak", "Null Dereference", "Buffer Overflow"],
    answer: 0,
    explanation: "UAF는 이미 해제된 메모리를 가리키는 댕글링 포인터를 통해 데이터에 접근할 때 발생합니다."
  },
  {
    id: 42,
    category: "Software Defense",
    question: "포맷 스트링 함수(printf 등)에서 스택의 값을 출력하지 않고, 변수에 값을 '쓰는' 지정자는?",
    options: ["%n", "%s", "%x", "%d", "%p"],
    answer: 0,
    explanation: "%n은 현재까지 출력된 문자열의 길이를 인자로 주어진 주소에 저장(Write)합니다."
  },
  {
    id: 43,
    category: "Software Defense",
    question: "스택 카나리 값을 모를 때, 한 바이트씩 추측하여 알아내는 공격 방식은?",
    options: ["Brute Force", "Dictionary Attack", "Rainbow Table", "Side Channel", "Phishing"],
    answer: 0,
    explanation: "서버가 포크(fork)되어 카나리 값이 유지되는 경우, 한 바이트씩 모든 경우의 수를 대입(Brute Force)해 볼 수 있습니다."
  },
  {
    id: 44,
    category: "Hardware-based Security",
    question: "ARM TrustZone에서 메모리 영역을 보안/비보안으로 나누어 접근을 제어하는 하드웨어 컨트롤러는?",
    options: ["TZASC", "MMU", "DMA", "GPIO", "UART"],
    answer: 0,
    explanation: "TZASC(TrustZone Address Space Controller)는 DRAM 영역을 보안 속성에 따라 파티셔닝합니다."
  },
  {
    id: 45,
    category: "Hardware-based Security",
    question: "Intel SGX에서 Enclave가 외부 OS 기능을 사용하기 위해 호출하는 방식은?",
    options: ["OCALL", "ECALL", "Syscall", "Hypercall", "API Call"],
    answer: 0,
    explanation: "Enclave 내부에서 외부(Untrusted) 함수를 호출하는 것을 OCALL(Out-call)이라고 합니다."
  },
  {
    id: 46,
    category: "Hardware-based Security",
    question: "Enclave 외부에서 내부의 함수를 호출하는 방식은?",
    options: ["ECALL", "OCALL", "Syscall", "Interrupt", "Signal"],
    answer: 0,
    explanation: "외부 애플리케이션이 Enclave 내부의 보안 기능을 사용하기 위해 들어가는 것을 ECALL(Enclave Call)이라고 합니다."
  },
  {
    id: 47,
    category: "OS Kernel Security",
    question: "x86 시스템에서 페이지 테이블의 최상위 주소(Physical Address)를 담고 있는 레지스터는?",
    options: ["CR3", "CR0", "EIP", "ESP", "EAX"],
    answer: 0,
    explanation: "CR3 레지스터는 현재 프로세스의 페이지 디렉토리 베이스 주소를 가리킵니다."
  },
  {
    id: 48,
    category: "Hardware-based Security",
    question: "TPM의 PCR 값을 특정 상태로 만들어야만 데이터가 복호화되도록 하는 기능은?",
    options: ["Sealing", "Binding", "Signing", "Hashing", "Encryption"],
    answer: 0,
    explanation: "Sealing(봉인)은 데이터 암호화 시 현재 시스템 상태(PCR)를 조건으로 걸어두는 기능입니다."
  },
  {
    id: 49,
    category: "Hardware-based Security",
    question: "Intel의 1회용 비밀번호(OTP) 생성 기술이 내장된 보안 기술은?",
    options: ["Intel IPT (Identity Protection Technology)", "Intel vPro", "Intel TXT", "Intel VT", "Intel AES-NI"],
    answer: 0,
    explanation: "Intel IPT는 하드웨어 내에 OTP 토큰 기능을 내장하여 2팩터 인증 등을 지원합니다."
  },
  {
    id: 50,
    category: "Hardware-based Security",
    question: "ARM TrustZone에서 Secure World의 커널 모드에 해당하는 예외 레벨은?",
    options: ["S-EL1", "S-EL0", "EL3", "EL2", "EL1"],
    answer: 0,
    explanation: "Secure World의 특권 모드(커널/OS)는 Secure EL1(S-EL1)에서 동작합니다."
  }
];

export default function QuizPage7() {
  return (
    <QuizTemplate 
      title="소프트웨어 및 시스템 보안" 
      subtitle="Total Quiz 2"
      quizData={quizData} 
    />
  );
}