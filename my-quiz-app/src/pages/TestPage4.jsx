import MockExamTemplate from "./TestTemplate";

const quizData = [
    // ===== 스택 & 메모리 기초 =====
    {
      id: 1,
      category: "스택 기초",
      question: "x86 아키텍처에서 스택이 성장하는 방향은?",
      options: [
        "높은 주소에서 낮은 주소로",
        "낮은 주소에서 높은 주소로",
        "좌에서 우로",
        "무작위 방향으로",
        "성장하지 않음"
      ],
      answer: 0,
      explanation: "x86에서 스택은 높은 주소에서 낮은 주소 방향으로 성장합니다. push 명령어 실행 시 ESP가 감소하고, pop 시 ESP가 증가합니다."
    },
    {
      id: 2,
      category: "스택 기초",
      question: "EBP 레지스터의 역할은?",
      options: [
        "다음 실행할 명령어 주소 저장",
        "현재 스택 프레임의 기준점(Base Pointer) 역할",
        "연산 결과 저장",
        "메모리 주소 계산",
        "인터럽트 처리"
      ],
      answer: 1,
      explanation: "EBP(Base Pointer)는 현재 함수의 스택 프레임 시작점을 가리킵니다. 지역 변수와 함수 인자에 접근할 때 기준점으로 사용됩니다."
    },
    {
      id: 3,
      category: "스택 기초",
      question: "ESP 레지스터의 역할은?",
      options: [
        "프로그램 카운터",
        "현재 스택의 최상단(Top)을 가리키는 포인터",
        "함수 반환값 저장",
        "플래그 레지스터",
        "세그먼트 레지스터"
      ],
      answer: 1,
      explanation: "ESP(Stack Pointer)는 현재 스택의 최상단 위치를 가리킵니다. push/pop 명령어에 따라 자동으로 증감합니다."
    },
    {
      id: 4,
      category: "스택 기초",
      question: "ret 명령어의 동작은?",
      options: [
        "EBP 값을 복원한다",
        "스택에서 값을 꺼내 EIP에 저장한다 (pop eip)",
        "함수 인자를 정리한다",
        "지역 변수를 초기화한다",
        "스택 프레임을 생성한다"
      ],
      answer: 1,
      explanation: "ret 명령어는 'pop eip'와 동일하게 동작합니다. 스택 최상단의 값(Return Address)을 꺼내 EIP에 저장하여 해당 주소로 점프합니다."
    },
  
    // ===== 취약한 함수 =====
    {
      id: 5,
      category: "취약한 함수",
      question: "gets() 함수가 위험한 이유는?",
      options: [
        "실행 속도가 느려서",
        "입력 길이를 제한하지 않아 버퍼 오버플로우 가능",
        "메모리를 많이 사용해서",
        "네트워크 연결이 필요해서",
        "파일을 삭제할 수 있어서"
      ],
      answer: 1,
      explanation: "gets() 함수는 입력 길이를 전혀 검사하지 않아, 버퍼 크기보다 긴 입력이 들어오면 버퍼 오버플로우가 발생합니다. 이 때문에 사용이 금지되었습니다."
    },
    {
      id: 6,
      category: "취약한 함수",
      question: "scanf(\"%s\", buffer)가 위험한 이유는?",
      options: [
        "숫자만 입력받을 수 있어서",
        "버퍼 크기를 지정하지 않아 오버플로우 가능",
        "파일에서만 읽을 수 있어서",
        "한 글자만 읽을 수 있어서",
        "특수문자를 처리하지 못해서"
      ],
      answer: 1,
      explanation: "scanf(\"%s\")는 공백 전까지 문자열을 읽지만 버퍼 크기를 지정하지 않습니다. scanf(\"%255s\", buffer)처럼 길이를 지정해야 안전합니다."
    },
    {
      id: 7,
      category: "취약한 함수",
      question: "strcpy() 대신 사용해야 할 안전한 함수는?",
      options: [
        "memcpy()",
        "strncpy()",
        "sprintf()",
        "gets()",
        "strcat()"
      ],
      answer: 1,
      explanation: "strncpy()는 복사할 최대 길이를 지정할 수 있어 strcpy()보다 안전합니다. strcpy()는 길이 검사 없이 복사하여 오버플로우 위험이 있습니다."
    },
  
    // ===== Return-to-libc 기초 =====
    {
      id: 8,
      category: "Return-to-libc",
      question: "Return-to-libc 공격이란?",
      options: [
        "라이브러리 파일을 삭제하는 공격",
        "DEP를 우회하기 위해 이미 메모리에 있는 라이브러리 함수를 호출하는 공격",
        "라이브러리를 새로 설치하는 공격",
        "라이브러리 버전을 변경하는 공격",
        "라이브러리 소스코드를 수정하는 공격"
      ],
      answer: 1,
      explanation: "Return-to-libc는 스택에 코드를 주입하지 않고, 이미 메모리에 로드된 libc의 system() 같은 함수를 호출하여 DEP(NX bit)를 우회합니다."
    },
    {
      id: 9,
      category: "Return-to-libc",
      question: "Return-to-libc 공격에서 자주 악용되는 함수는?",
      options: [
        "printf()",
        "scanf()",
        "system()",
        "strlen()",
        "strcpy()"
      ],
      answer: 2,
      explanation: "system() 함수는 쉘 명령어를 실행할 수 있어, 공격자가 system(\"/bin/sh\")를 호출하면 쉘을 획득할 수 있습니다."
    },
  
    // ===== NOP Sled =====
    {
      id: 10,
      category: "NOP Sled",
      question: "NOP Sled란 무엇인가?",
      options: [
        "프로그램을 종료시키는 코드",
        "아무 동작도 하지 않는 NOP 명령어를 연속으로 배치하여 shellcode 진입을 쉽게 하는 기법",
        "네트워크 패킷을 전송하는 코드",
        "파일을 암호화하는 코드",
        "메모리를 정리하는 코드"
      ],
      answer: 1,
      explanation: "NOP Sled는 NOP(No Operation) 명령어를 shellcode 앞에 연속으로 배치합니다. 정확한 주소를 몰라도 NOP 영역 어디든 착지하면 shellcode까지 미끄러져 내려갑니다."
    },
    {
      id: 11,
      category: "NOP Sled",
      question: "NOP 명령어의 역할은?",
      options: [
        "프로그램 종료",
        "아무 동작도 하지 않고 다음 명령어로 넘어감",
        "메모리 할당",
        "파일 열기",
        "네트워크 연결"
      ],
      answer: 1,
      explanation: "NOP(No Operation)은 아무런 동작을 하지 않고 EIP(명령어 포인터)만 다음 명령어로 이동시킵니다. x86에서는 0x90 바이트입니다."
    },
  
    // ===== 프로세스 메모리 구조 =====
    {
      id: 12,
      category: "메모리 구조",
      question: "프로세스 메모리에서 코드(Text) 영역의 특징은?",
      options: [
        "읽기/쓰기/실행 모두 가능",
        "실행 가능하지만 일반적으로 쓰기 불가 (Read-Only)",
        "쓰기만 가능",
        "접근 불가",
        "암호화되어 있음"
      ],
      answer: 1,
      explanation: "코드(Text) 영역은 프로그램의 실행 코드가 저장되며, 보통 읽기와 실행만 가능하고 쓰기는 불가능하게 설정되어 코드 변조를 방지합니다."
    },
    {
      id: 13,
      category: "메모리 구조",
      question: "힙(Heap)과 스택(Stack)의 차이점은?",
      options: [
        "힙은 정적 할당, 스택은 동적 할당",
        "힙은 동적 할당(malloc), 스택은 자동 할당(지역 변수)",
        "둘 다 동일한 방식",
        "힙은 코드 저장, 스택은 데이터 저장",
        "힙은 읽기 전용, 스택은 쓰기 전용"
      ],
      answer: 1,
      explanation: "힙은 malloc(), new 등으로 프로그래머가 동적으로 할당하고, 스택은 함수 호출 시 지역 변수, return address 등이 자동으로 할당됩니다."
    },
  
    // ===== 환경 변수 공격 =====
    {
      id: 14,
      category: "환경 변수",
      question: "PATH 환경 변수를 이용한 공격의 원리는?",
      options: [
        "PATH를 삭제하여 프로그램 실행을 막는다",
        "PATH에 악성 프로그램 경로를 추가하여 정상 명령어 대신 실행되게 한다",
        "PATH를 암호화한다",
        "PATH 길이를 늘린다",
        "PATH를 네트워크로 전송한다"
      ],
      answer: 1,
      explanation: "공격자가 PATH 앞에 자신의 디렉토리를 추가하면, 프로그램이 명령어를 찾을 때 공격자의 악성 프로그램이 먼저 실행될 수 있습니다."
    },
    {
      id: 15,
      category: "환경 변수",
      question: "system() 함수가 PATH 공격에 취약한 이유는?",
      options: [
        "항상 root 권한으로 실행되어서",
        "내부적으로 /bin/sh을 호출하고, shell이 PATH를 참조하기 때문",
        "네트워크 연결을 사용해서",
        "파일을 직접 수정해서",
        "암호화를 사용하지 않아서"
      ],
      answer: 1,
      explanation: "system() 함수는 내부적으로 /bin/sh -c 명령어를 호출합니다. shell은 PATH 환경 변수를 참조하여 명령어를 찾으므로, PATH 조작에 취약합니다."
    },
  
    // ===== 리눅스 명령어 기초 =====
    {
      id: 16,
      category: "리눅스",
      question: "ls -la 명령어에서 's' 권한(예: rwsr-xr-x)의 의미는?",
      options: [
        "파일이 숨겨져 있음",
        "Set-UID 비트가 설정되어 있음",
        "파일이 공유됨",
        "파일이 심볼릭 링크임",
        "파일이 압축됨"
      ],
      answer: 1,
      explanation: "권한에서 's'는 Set-UID(또는 Set-GID) 비트를 나타냅니다. 이 프로그램은 실행 시 소유자의 권한으로 동작합니다."
    },
    {
      id: 17,
      category: "리눅스",
      question: "/etc/passwd 파일의 용도는?",
      options: [
        "사용자 비밀번호 해시 저장",
        "사용자 계정 정보(이름, UID, 홈 디렉토리 등) 저장",
        "시스템 로그 저장",
        "네트워크 설정 저장",
        "프로세스 정보 저장"
      ],
      answer: 1,
      explanation: "/etc/passwd는 사용자 계정 정보(사용자명, UID, GID, 홈 디렉토리, 쉘 등)를 저장합니다. 비밀번호 해시는 /etc/shadow에 있습니다."
    },
    {
      id: 18,
      category: "리눅스",
      question: "ln -s target link 명령어의 기능은?",
      options: [
        "파일 복사",
        "target을 가리키는 심볼릭 링크 link 생성",
        "파일 이동",
        "파일 삭제",
        "파일 압축"
      ],
      answer: 1,
      explanation: "ln -s는 심볼릭 링크(Symbolic Link)를 생성합니다. link 파일이 target 파일을 가리키는 바로가기 역할을 합니다."
    },
  
    // ===== 방어 기법 추가 =====
    {
      id: 19,
      category: "방어 기법",
      question: "ASLR이 무작위로 배치하는 것은?",
      options: [
        "파일 이름",
        "스택, 힙, 라이브러리 등의 메모리 주소",
        "사용자 비밀번호",
        "네트워크 포트",
        "프로세스 ID"
      ],
      answer: 1,
      explanation: "ASLR(Address Space Layout Randomization)은 스택, 힙, 공유 라이브러리의 메모리 주소를 프로그램 실행마다 무작위로 배치하여 공격자의 주소 예측을 어렵게 합니다."
    },
    {
      id: 20,
      category: "방어 기법",
      question: "NX bit(DEP)가 비활성화된 경우 가능한 공격은?",
      options: [
        "SQL Injection",
        "스택이나 힙에 주입한 shellcode 직접 실행",
        "피싱 공격",
        "DDoS 공격",
        "사회공학 공격"
      ],
      answer: 1,
      explanation: "NX bit가 비활성화되면 스택이나 힙 영역에서 코드 실행이 가능해져, 공격자가 주입한 shellcode를 직접 실행할 수 있습니다."
    },
  
    // ===== 기본 용어 =====
    {
      id: 21,
      category: "기본 용어",
      question: "취약점(Vulnerability)이란?",
      options: [
        "해킹 도구",
        "시스템이나 소프트웨어의 보안상 약점",
        "바이러스의 종류",
        "네트워크 프로토콜",
        "암호화 알고리즘"
      ],
      answer: 1,
      explanation: "취약점은 시스템이나 소프트웨어에 존재하는 보안상의 약점으로, 공격자가 이를 악용하여 비정상적인 동작을 유발할 수 있습니다."
    },
    {
      id: 22,
      category: "기본 용어",
      question: "익스플로잇(Exploit)이란?",
      options: [
        "보안 업데이트",
        "취약점을 실제로 공격하는 코드나 기법",
        "방화벽 설정",
        "백업 프로그램",
        "안티바이러스"
      ],
      answer: 1,
      explanation: "익스플로잇은 발견된 취약점을 실제로 악용하여 공격을 수행하는 코드, 프로그램, 또는 기법을 말합니다."
    },
    {
      id: 23,
      category: "기본 용어",
      question: "페이로드(Payload)란?",
      options: [
        "네트워크 대역폭",
        "공격 성공 후 실행되는 악성 코드 (예: shellcode)",
        "패킷 헤더",
        "인증서",
        "로그 파일"
      ],
      answer: 1,
      explanation: "페이로드는 공격이 성공한 후 실행되는 실제 악성 코드입니다. 버퍼 오버플로우에서 shellcode가 대표적인 페이로드입니다."
    },
  
    // ===== 권한 관련 =====
    {
      id: 24,
      category: "권한",
      question: "리눅스에서 root 사용자의 UID는?",
      options: [
        "1",
        "0",
        "1000",
        "65535",
        "-1"
      ],
      answer: 1,
      explanation: "root(슈퍼유저)의 UID는 0입니다. UID 0을 가진 사용자는 시스템의 모든 권한을 가집니다."
    },
    {
      id: 25,
      category: "권한",
      question: "권한 상승(Privilege Escalation)이란?",
      options: [
        "파일 권한을 변경하는 것",
        "일반 사용자가 관리자(root) 권한을 획득하는 것",
        "네트워크 속도를 높이는 것",
        "프로그램 실행 속도를 높이는 것",
        "메모리 용량을 늘리는 것"
      ],
      answer: 1,
      explanation: "권한 상승은 공격자가 취약점을 이용하여 일반 사용자에서 root나 관리자 권한을 획득하는 것을 말합니다."
    }
  ];

  export default function TestPage4() {
    return (
        <MockExamTemplate 
        quizData={quizData} 
        title="소시보" 
        subtitle="모의 시험 4" 
        />
    );
}