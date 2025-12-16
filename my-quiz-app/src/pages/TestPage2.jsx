import MockExamTemplate from './TestTemplate';

const quizData= [
    {
      id: 1,
      category: "스택 프레임", 
      question: "x86 아키텍처에서 함수 프롤로그(Function Prologue)의 올바른 명령어 순서는?",
      options: [
        "push ebp; mov ebp, esp",
        "mov ebp, esp; push ebp",
        "pop ebp; ret",
        "sub esp, 0x10; push ebp",
        "leave; ret"
      ],
      answer: 0,
      explanation: "함수 프롤로그는 'push ebp'로 이전 프레임 포인터를 저장하고, 'mov ebp, esp'로 현재 스택 포인터를 새로운 프레임 포인터로 설정합니다."
    },
    {
      id: 2,
      category: "스택 프레임",
      question: "x86에서 'leave' 명령어와 동일한 동작을 하는 명령어 조합은?",
      options: [
        "push ebp; mov ebp, esp",
        "mov esp, ebp; pop ebp",
        "pop eip; ret",
        "sub esp, 4; push ebp",
        "add esp, 4; pop ebp"
      ],
      answer: 1,
      explanation: "leave 명령어는 'mov esp, ebp'로 스택 포인터를 프레임 포인터 위치로 복원하고, 'pop ebp'로 저장된 EBP 값을 복원합니다."
    },
    {
      id: 3,
      category: "스택 프레임",
      question: "cdecl 호출 규약에서 스택 프레임의 구성 순서로 올바른 것은? (높은 주소 → 낮은 주소)",
      options: [
        "지역변수 → Saved EBP → Return Address → 함수 인자",
        "함수 인자 → Return Address → Saved EBP → 지역변수",
        "Return Address → 함수 인자 → Saved EBP → 지역변수",
        "Saved EBP → Return Address → 함수 인자 → 지역변수",
        "함수 인자 → Saved EBP → Return Address → 지역변수"
      ],
      answer: 1,
      explanation: "cdecl 규약에서 스택은 높은 주소에서 낮은 주소로 성장하며, 함수 인자 → Return Address → Saved EBP → 지역변수 순으로 배치됩니다."
    },
  
    // ===== GOT/PLT & 동적 링킹 =====
    {
      id: 4,
      category: "GOT/PLT",
      question: "GOT(Global Offset Table)에 대한 설명으로 틀린 것은?",
      options: [
        "동적 링킹된 함수의 실제 주소를 저장한다",
        "첫 번째 호출 시 동적 링커가 GOT를 업데이트한다",
        "GOT는 실행 파일의 코드 섹션에 위치한다",
        "공격자가 GOT를 조작하면 제어 흐름을 변경할 수 있다",
        "Lazy Binding 방식에서 사용된다"
      ],
      answer: 2,
      explanation: "GOT는 코드 섹션이 아닌 데이터 섹션에 위치합니다. 쓰기 가능한 영역이어야 동적 링커가 주소를 업데이트할 수 있기 때문입니다."
    },
    {
      id: 5,
      category: "GOT/PLT",
      question: "ret2got 공격 기법에 대한 설명으로 올바른 것은?",
      options: [
        "스택의 return address를 직접 변경하는 공격이다",
        "GOT 엔트리를 다른 함수(예: system)의 PLT 주소로 덮어쓰는 공격이다",
        "PLT를 직접 수정하여 악성 코드를 삽입하는 공격이다",
        "GOT를 읽어서 ASLR을 우회하는 기법만을 의미한다",
        "커널 영역의 GOT를 공격하는 기법이다"
      ],
      answer: 1,
      explanation: "ret2got 공격은 GOT 엔트리의 값을 다른 함수(예: system)의 PLT 주소로 변경하여, 원래 함수 호출 시 공격자가 원하는 함수가 실행되도록 합니다."
    },
  
    // ===== Format String Bug 심화 =====
    {
      id: 6,
      category: "Format String",
      question: "Format String 공격에서 va_list 포인터의 역할은?",
      options: [
        "포맷 문자열을 파싱하는 함수를 가리킨다",
        "스택에서 가변 인자를 순차적으로 읽어오는 포인터이다",
        "출력 버퍼의 시작 주소를 저장한다",
        "함수의 return address를 가리킨다",
        "힙 영역의 메모리를 관리한다"
      ],
      answer: 1,
      explanation: "va_list는 가변 인자 함수에서 스택의 optional argument들을 순차적으로 읽어오기 위한 포인터입니다. va_arg 매크로로 이동시키며 값을 읽어옵니다."
    },
    {
      id: 7,
      category: "Format String",
      question: "%n, %hn, %hhn 포맷 지정자의 쓰기 크기가 올바르게 짝지어진 것은?",
      options: [
        "%n: 1바이트, %hn: 2바이트, %hhn: 4바이트",
        "%n: 2바이트, %hn: 1바이트, %hhn: 4바이트",
        "%n: 4바이트, %hn: 2바이트, %hhn: 1바이트",
        "%n: 8바이트, %hn: 4바이트, %hhn: 2바이트",
        "%n: 4바이트, %hn: 1바이트, %hhn: 2바이트"
      ],
      answer: 2,
      explanation: "%n은 4바이트(int), %hn(half)은 2바이트(short), %hhn(half-half)은 1바이트(char) 크기로 메모리에 값을 씁니다."
    },
    {
      id: 8,
      category: "Format String",
      question: "Format String 버그가 Stack Canary 방어 기법을 우회할 수 있는 이유는?",
      options: [
        "Canary 값을 미리 예측할 수 있기 때문에",
        "스택을 선형적으로 덮어쓰지 않고 원하는 주소에 직접 쓸 수 있기 때문에",
        "Canary가 Format String에는 적용되지 않기 때문에",
        "printf 함수가 Canary 검사를 수행하지 않기 때문에",
        "Format String은 힙에서만 동작하기 때문에"
      ],
      answer: 1,
      explanation: "버퍼 오버플로우는 스택을 선형적으로 덮어쓰므로 Canary가 손상되지만, Format String 버그는 %n을 통해 원하는 주소에 직접 값을 쓸 수 있어 Canary를 건드리지 않고 return address를 변경할 수 있습니다."
    },
  
    // ===== 방어 기법 심화 =====
    {
      id: 9,
      category: "방어 기법",
      question: "RELRO(Relocation Read-Only)의 Full RELRO와 Partial RELRO의 차이점은?",
      options: [
        "Full RELRO는 코드 섹션만, Partial은 데이터 섹션만 보호한다",
        "Full RELRO는 GOT 전체를 읽기 전용으로, Partial은 GOT의 일부만 보호한다",
        "Full RELRO는 64비트, Partial은 32비트 시스템용이다",
        "둘 다 동일하며 이름만 다르다",
        "Full RELRO는 스택을, Partial은 힙을 보호한다"
      ],
      answer: 1,
      explanation: "Partial RELRO는 .got 섹션만 읽기 전용으로 만들고, Full RELRO는 .got.plt를 포함한 GOT 전체를 읽기 전용으로 만들어 GOT Overwrite 공격을 방어합니다."
    },
    {
      id: 10,
      category: "방어 기법",
      question: "Stack Canary 값이 저장되는 위치로 올바른 것은?",
      options: [
        "Return Address 위 (높은 주소)",
        "Saved EBP와 지역변수 사이",
        "함수 인자와 Return Address 사이",
        "지역변수 아래 (가장 낮은 주소)",
        "힙 영역의 메타데이터"
      ],
      answer: 1,
      explanation: "Stack Canary는 Saved EBP와 지역변수(버퍼) 사이에 위치하여, 버퍼 오버플로우 시 Return Address보다 먼저 Canary가 손상되도록 합니다."
    },
    {
      id: 11,
      category: "방어 기법",
      question: "Intel CET(Control-flow Enforcement Technology)의 Shadow Stack에 대한 설명으로 올바른 것은?",
      options: [
        "데이터와 코드를 함께 저장하는 보조 스택이다",
        "Return Address만 저장하는 별도의 스택으로, RET 시 두 스택의 주소를 비교한다",
        "함수 인자를 저장하는 스택이다",
        "힙 오버플로우를 방어하기 위한 기술이다",
        "MOV, XSAVE 등의 명령어로 자유롭게 접근 가능하다"
      ],
      answer: 1,
      explanation: "Shadow Stack은 Return Address만 저장하는 별도의 스택입니다. CALL 시 양쪽 스택에 return address를 push하고, RET 시 두 값을 비교하여 불일치 시 예외를 발생시킵니다."
    },
    {
      id: 12,
      category: "방어 기법",
      question: "Intel CET의 Indirect Branch Tracking에서 사용되는 ENDBRANCH 명령어의 역할은?",
      options: [
        "간접 점프/호출의 종료를 표시한다",
        "유효한 간접 점프/호출의 대상 위치를 표시한다",
        "분기 예측을 비활성화한다",
        "Shadow Stack을 업데이트한다",
        "ASLR을 활성화한다"
      ],
      answer: 1,
      explanation: "ENDBRANCH는 간접 call/jmp의 유효한 타겟 위치를 표시합니다. 간접 분기 후 ENDBRANCH가 없으면 예외가 발생하여 ROP/JOP 공격을 방어합니다."
    },
  
    // ===== Race Condition & TOCTTOU =====
    {
      id: 13,
      category: "Race Condition",
      question: "Sticky Symlink Protection이 심볼릭 링크 접근을 허용하는 조건은?",
      options: [
        "링크가 root에 의해 생성된 경우만",
        "심볼릭 링크 소유자가 프로세스의 EUID 또는 디렉토리 소유자와 일치하는 경우",
        "링크 대상 파일이 world-writable인 경우",
        "/tmp 디렉토리 외부에 있는 경우만",
        "프로세스의 RUID가 0인 경우"
      ],
      answer: 1,
      explanation: "Sticky Symlink Protection은 심볼릭 링크의 소유자가 프로세스의 EUID(Effective UID) 또는 디렉토리 소유자와 일치할 때만 링크 follow를 허용합니다."
    },
    {
      id: 14,
      category: "Race Condition",
      question: "TOCTTOU 공격을 방어하기 위한 방법으로 적절하지 않은 것은?",
      options: [
        "Atomic Operation 사용",
        "Check와 Use를 반복 수행",
        "Sticky Symlink Protection 활성화",
        "최소 권한 원칙 적용",
        "파일 접근 권한을 777로 설정"
      ],
      answer: 4,
      explanation: "파일 접근 권한을 777(모든 사용자 읽기/쓰기/실행)로 설정하는 것은 보안을 약화시키는 행위이며, TOCTTOU 방어와 무관합니다."
    },
  
    // ===== 커널 & 루트킷 =====
    {
      id: 15,
      category: "커널 보안",
      question: "루트킷(Rootkit)에 대한 설명으로 올바른 것은?",
      options: [
        "일반 사용자 권한으로 동작하는 악성코드이다",
        "커널 권한을 가지며 OS 기능을 조작하여 탐지를 회피하는 악성코드이다",
        "웹 브라우저만을 대상으로 하는 악성코드이다",
        "안티바이러스로 쉽게 탐지할 수 있다",
        "사용자 모드에서만 동작한다"
      ],
      answer: 1,
      explanation: "루트킷은 커널 권한(Ring 0)을 가진 악성코드로, OS 기능을 조작하여 자신의 존재를 숨기고 탐지를 회피합니다. 보통 악성 커널 드라이버 형태로 동작합니다."
    },
    {
      id: 16,
      category: "커널 보안",
      question: "x86 시스템에서 INT 0x80 명령어 실행 시 일어나는 일은?",
      options: [
        "프로그램이 종료된다",
        "사용자 모드에서 커널 모드로 전환되어 시스템 콜이 호출된다",
        "인터럽트가 비활성화된다",
        "페이지 폴트가 발생한다",
        "프로세스가 sleep 상태가 된다"
      ],
      answer: 1,
      explanation: "INT 0x80은 리눅스에서 시스템 콜을 호출하는 소프트웨어 인터럽트입니다. 이 명령어 실행 시 CPU는 사용자 모드(Ring 3)에서 커널 모드(Ring 0)로 전환됩니다."
    },
    {
      id: 17,
      category: "커널 보안",
      question: "PCB(Process Control Block)에 저장된 정보 중 권한 상승 공격에 악용될 수 있는 것은?",
      options: [
        "프로세스 이름",
        "I/O 정보",
        "UID (User ID)",
        "스케줄링 우선순위",
        "프로세스 생성 시간"
      ],
      answer: 2,
      explanation: "PCB에 저장된 UID를 공격자가 조작하면 일반 사용자 프로세스가 root 권한을 획득하는 권한 상승(Privilege Escalation) 공격이 가능합니다."
    },
  
    // ===== TEE & TrustZone 심화 =====
    {
      id: 18,
      category: "TEE",
      question: "ARM TrustZone에서 SCR(Secure Configuration Register)의 NS 비트 역할은?",
      options: [
        "Non-executable Stack 설정",
        "현재 CPU 상태가 Normal World(1) 또는 Secure World(0)인지 표시",
        "Network Security 활성화",
        "Nested Interrupt 설정",
        "ASLR 활성화 여부"
      ],
      answer: 1,
      explanation: "SCR의 NS(Non-Secure) 비트가 1이면 Normal World, 0이면 Secure World 상태입니다. 이 비트는 Monitor 모드에서만 변경 가능합니다."
    },
    {
      id: 19,
      category: "TEE",
      question: "삼성 KNOX가 커널 보호를 위해 사용하는 기법은?",
      options: [
        "커널 코드를 암호화하여 저장",
        "페이지 테이블을 Read-Only로 설정하고 Secure World에서 업데이트 대행",
        "커널을 User Mode에서 실행",
        "모든 시스템 콜을 비활성화",
        "커널을 매번 새로 컴파일"
      ],
      answer: 1,
      explanation: "삼성 KNOX는 커널의 중요 영역(코드, 페이지 테이블)을 Read-Only로 설정하고, 업데이트가 필요할 때 SMC를 통해 Secure World의 검증을 거쳐 대신 수행하도록 합니다."
    },
    {
      id: 20,
      category: "TEE",
      question: "Intel SGX의 주요 목적은?",
      options: [
        "네트워크 트래픽 암호화",
        "신뢰할 수 없는 OS로부터 애플리케이션의 데이터와 코드를 보호",
        "하드디스크 전체 암호화",
        "바이러스 검사 가속화",
        "그래픽 처리 가속화"
      ],
      answer: 1,
      explanation: "Intel SGX는 Enclave라는 보호된 메모리 영역을 제공하여, OS가 compromise되어도 애플리케이션의 민감한 데이터와 코드를 보호합니다."
    },
  
    // ===== Cache Attack (Meltdown/Spectre) =====
    {
      id: 21,
      category: "Cache Attack",
      question: "Out-of-order Execution이 Meltdown 공격에 악용되는 이유는?",
      options: [
        "명령어를 병렬로 실행하여 성능을 높이기 때문에",
        "권한 검사 전에 데이터를 미리 읽어와 캐시에 남기기 때문에",
        "분기 예측이 항상 정확하기 때문에",
        "메모리를 암호화하기 때문에",
        "인터럽트를 비활성화하기 때문에"
      ],
      answer: 1,
      explanation: "Out-of-order Execution은 성능을 위해 명령어를 순서와 관계없이 실행합니다. 권한 검사 실패로 롤백되어도 이미 읽은 데이터가 캐시에 남아 Side-channel로 유출될 수 있습니다."
    },
    {
      id: 22,
      category: "Cache Attack",
      question: "Spectre 공격이 악용하는 CPU 기능은?",
      options: [
        "가상 메모리",
        "분기 예측(Branch Prediction)",
        "DMA (Direct Memory Access)",
        "인터럽트 처리",
        "페이지 테이블"
      ],
      answer: 1,
      explanation: "Spectre는 CPU의 분기 예측(Branch Prediction)을 악용합니다. 공격자가 분기 예측을 훈련시켜 투기적 실행을 유도하고, 그 과정에서 비밀 데이터를 캐시에 남깁니다."
    },
  
    // ===== ROP 심화 =====
    {
      id: 23,
      category: "ROP",
      question: "ROP에서 'Gadget Chaining'을 위해 ESP가 중요한 이유는?",
      options: [
        "ESP가 코드 섹션을 가리키기 때문에",
        "RET 명령어가 ESP가 가리키는 주소로 점프하므로, ESP 제어가 제어 흐름 결정에 핵심이기 때문에",
        "ESP는 항상 0으로 초기화되기 때문에",
        "ESP가 Canary 값을 저장하기 때문에",
        "ESP는 읽기 전용이기 때문에"
      ],
      answer: 1,
      explanation: "RET 명령어는 'pop eip'와 동일하게 ESP가 가리키는 주소로 점프합니다. 따라서 ESP를 제어하면 연속적으로 가젯들을 연결하여 원하는 작업을 수행할 수 있습니다."
    },
    {
      id: 24,
      category: "ROP",
      question: "Return-to-return 기법이 사용되는 상황은?",
      options: [
        "ASLR이 비활성화된 경우",
        "shellcode 주소의 상위 바이트에 NULL이 포함되어 있을 때 이를 우회하기 위해",
        "Stack Canary를 우회하기 위해",
        "커널 공격을 위해",
        "힙 오버플로우 공격 시"
      ],
      answer: 1,
      explanation: "Return-to-return은 shellcode 주소에 NULL 바이트(0x00)가 포함될 때 사용합니다. 여러 개의 ret 가젯을 연결하여 ESP를 증가시키고, 최종적으로 shellcode로 점프합니다."
    },
  
    // ===== 환경 변수 & 입력 공격 =====
    {
      id: 25,
      category: "시스템 입력",
      question: "system() 함수를 사용할 때 PATH 환경 변수 공격이 가능한 이유는?",
      options: [
        "system()이 항상 root 권한으로 실행되기 때문에",
        "system()이 /bin/sh을 호출하고, shell이 PATH를 사용하여 명령어를 찾기 때문에",
        "system()이 환경 변수를 암호화하기 때문에",
        "PATH가 항상 /tmp를 포함하기 때문에",
        "system()이 네트워크 연결을 사용하기 때문에"
      ],
      answer: 1,
      explanation: "system() 함수는 /bin/sh을 호출하여 명령어를 실행하고, shell은 PATH 환경 변수를 참조하여 명령어 위치를 찾습니다. 공격자가 PATH를 조작하면 악성 프로그램이 실행될 수 있습니다."
    }
  ];
  
  export default function TestPage2() {
    return (
        <MockExamTemplate 
        quizData={quizData} 
        title="소시보" 
        subtitle="모의 시험 2" 
        />
    );
}