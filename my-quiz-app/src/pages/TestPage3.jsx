import MockExamTemplate from './TestTemplate';

const quizData= [
    // ===== Set-UID 기초 =====
    {
      id: 1,
      category: "Set-UID",
      question: "Set-UID 프로그램이란 무엇인가?",
      options: [
        "사용자가 직접 만든 프로그램",
        "프로그램 소유자의 권한으로 실행되는 프로그램",
        "관리자만 실행할 수 있는 프로그램",
        "네트워크에서만 실행되는 프로그램",
        "암호화된 프로그램"
      ],
      answer: 1,
      explanation: "Set-UID 프로그램은 실행 시 프로그램 소유자의 권한으로 동작합니다. 예를 들어 root 소유의 Set-UID 프로그램은 일반 사용자가 실행해도 root 권한으로 동작합니다."
    },
    {
      id: 2,
      category: "Set-UID",
      question: "/usr/bin/passwd 프로그램이 Set-UID로 설정된 이유는?",
      options: [
        "빠른 실행을 위해",
        "일반 사용자가 /etc/shadow 파일을 수정할 수 있도록 하기 위해",
        "네트워크 통신을 위해",
        "로그 파일 생성을 위해",
        "프로그램 업데이트를 위해"
      ],
      answer: 1,
      explanation: "passwd 프로그램은 사용자 비밀번호를 변경할 때 /etc/shadow 파일을 수정해야 합니다. 이 파일은 root만 쓸 수 있으므로, Set-UID를 통해 일시적으로 root 권한을 얻어 수정합니다."
    },
    {
      id: 3,
      category: "Set-UID",
      question: "chmod 4755 myfile 명령어에서 '4'의 의미는?",
      options: [
        "읽기 권한",
        "쓰기 권한",
        "실행 권한",
        "Set-UID 비트 설정",
        "디렉토리 권한"
      ],
      answer: 3,
      explanation: "chmod에서 첫 번째 숫자 '4'는 Set-UID 비트를 설정합니다. 이렇게 설정된 프로그램은 실행 시 소유자의 권한으로 동작합니다."
    },
    {
      id: 4,
      category: "Set-UID",
      question: "RUID와 EUID의 차이점은?",
      options: [
        "RUID는 파일 권한, EUID는 프로세스 권한",
        "RUID는 실제 사용자 ID, EUID는 권한 검사에 사용되는 유효 사용자 ID",
        "RUID는 읽기 권한, EUID는 실행 권한",
        "둘은 동일한 의미이다",
        "RUID는 root ID, EUID는 일반 사용자 ID"
      ],
      answer: 1,
      explanation: "RUID(Real UID)는 프로세스를 실행한 실제 사용자의 ID이고, EUID(Effective UID)는 접근 제어에 사용되는 유효 사용자 ID입니다. Set-UID 프로그램에서는 RUID와 EUID가 다릅니다."
    },
  
    // ===== 리눅스 기초 =====
    {
      id: 5,
      category: "리눅스 기초",
      question: "리눅스 파일 권한 'rwxr-xr-x'에서 'r-x'의 의미는?",
      options: [
        "읽기, 쓰기, 실행 가능",
        "읽기와 실행만 가능, 쓰기 불가",
        "실행만 가능",
        "모든 권한 없음",
        "쓰기와 실행만 가능"
      ],
      answer: 1,
      explanation: "r은 읽기(read), w는 쓰기(write), x는 실행(execute) 권한입니다. 'r-x'는 읽기와 실행은 가능하지만 쓰기는 불가능함을 의미합니다."
    },
    {
      id: 6,
      category: "리눅스 기초",
      question: "chmod 755 file 명령어의 결과로 설정되는 권한은?",
      options: [
        "소유자: rwx, 그룹: r-x, 기타: r-x",
        "소유자: r-x, 그룹: rwx, 기타: rwx",
        "소유자: rw-, 그룹: r--, 기타: r--",
        "모든 사용자: rwx",
        "소유자: rwx, 그룹: rwx, 기타: r--"
      ],
      answer: 0,
      explanation: "7=rwx(4+2+1), 5=r-x(4+0+1)입니다. 따라서 755는 소유자에게 모든 권한, 그룹과 기타 사용자에게는 읽기와 실행 권한만 부여합니다."
    },
    {
      id: 7,
      category: "리눅스 기초",
      question: "/tmp 디렉토리의 특징으로 올바른 것은?",
      options: [
        "root만 접근 가능한 디렉토리",
        "모든 사용자가 파일을 생성할 수 있는 world-writable 디렉토리",
        "시스템 설정 파일이 저장되는 디렉토리",
        "사용자 홈 디렉토리",
        "커널 모듈이 저장되는 디렉토리"
      ],
      answer: 1,
      explanation: "/tmp는 모든 사용자가 임시 파일을 생성할 수 있는 world-writable 디렉토리입니다. 이 특성 때문에 Race Condition 공격의 대상이 되기도 합니다."
    },
  
    // ===== 버퍼 오버플로우 기초 =====
    {
      id: 8,
      category: "버퍼 오버플로우",
      question: "버퍼 오버플로우란 무엇인가?",
      options: [
        "프로그램이 너무 빨리 실행되는 것",
        "할당된 버퍼의 크기를 초과하여 데이터를 쓰는 것",
        "메모리가 부족한 상태",
        "네트워크 대역폭 초과",
        "CPU 과부하 상태"
      ],
      answer: 1,
      explanation: "버퍼 오버플로우는 프로그램이 할당된 버퍼 크기보다 더 많은 데이터를 쓸 때 발생합니다. 이로 인해 인접한 메모리 영역이 덮어씌워질 수 있습니다."
    },
    {
      id: 9,
      category: "버퍼 오버플로우",
      question: "스택 버퍼 오버플로우 공격의 주요 목표는?",
      options: [
        "프로그램 속도 향상",
        "Return Address를 변조하여 제어 흐름 탈취",
        "파일 삭제",
        "네트워크 연결 차단",
        "로그 파일 생성"
      ],
      answer: 1,
      explanation: "스택 버퍼 오버플로우 공격은 버퍼를 넘쳐서 스택에 저장된 Return Address를 공격자가 원하는 주소로 변경하여, 프로그램의 제어 흐름을 탈취합니다."
    },
    {
      id: 10,
      category: "버퍼 오버플로우",
      question: "다음 중 버퍼 오버플로우에 취약한 함수는?",
      options: [
        "fgets()",
        "strncpy()",
        "strcpy()",
        "snprintf()",
        "strlcpy()"
      ],
      answer: 2,
      explanation: "strcpy()는 복사할 문자열의 길이를 검사하지 않아 버퍼 오버플로우에 취약합니다. fgets(), strncpy(), snprintf() 등은 길이를 제한할 수 있어 더 안전합니다."
    },
    {
      id: 11,
      category: "버퍼 오버플로우",
      question: "x86 스택에서 함수 호출 시 Return Address가 저장되는 위치는?",
      options: [
        "힙 영역",
        "스택의 버퍼 아래",
        "Saved EBP 바로 위 (높은 주소)",
        "코드 영역",
        "데이터 영역"
      ],
      answer: 2,
      explanation: "함수 호출 시 Return Address는 스택에 push되어 Saved EBP 바로 위(높은 주소)에 저장됩니다. 함수가 끝나면 이 주소로 복귀합니다."
    },
  
    // ===== Shellcode 기초 =====
    {
      id: 12,
      category: "Shellcode",
      question: "Shellcode란 무엇인가?",
      options: [
        "쉘 스크립트 파일",
        "취약점을 이용하여 주입되는 기계어 코드",
        "운영체제의 쉘 프로그램",
        "암호화된 코드",
        "컴파일러가 생성하는 코드"
      ],
      answer: 1,
      explanation: "Shellcode는 취약점을 이용해 시스템에 주입되어 실행되는 기계어(어셈블리) 코드입니다. 주로 쉘을 실행하여 시스템 제어권을 얻는 목적으로 사용됩니다."
    },
    {
      id: 13,
      category: "Shellcode",
      question: "리눅스에서 쉘을 실행하기 위해 shellcode가 호출하는 시스템 콜은?",
      options: [
        "read()",
        "write()",
        "execve()",
        "fork()",
        "open()"
      ],
      answer: 2,
      explanation: "execve() 시스템 콜은 새로운 프로그램을 실행합니다. shellcode는 주로 execve(\"/bin/sh\", ...)를 호출하여 쉘을 실행합니다."
    },
    {
      id: 14,
      category: "Shellcode",
      question: "x86 리눅스에서 시스템 콜을 호출하는 명령어는?",
      options: [
        "call",
        "jmp",
        "int 0x80",
        "ret",
        "push"
      ],
      answer: 2,
      explanation: "x86 리눅스에서 int 0x80 명령어는 소프트웨어 인터럽트를 발생시켜 커널 모드로 전환하고 시스템 콜을 호출합니다."
    },
  
    // ===== Format String 기초 =====
    {
      id: 15,
      category: "Format String",
      question: "Format String 버그란 무엇인가?",
      options: [
        "문자열 길이가 너무 긴 버그",
        "printf 등의 포맷 함수에서 사용자 입력이 포맷 문자열로 사용될 때 발생하는 버그",
        "파일 포맷이 잘못된 버그",
        "날짜 형식이 잘못된 버그",
        "인코딩 오류"
      ],
      answer: 1,
      explanation: "Format String 버그는 printf(user_input)처럼 사용자 입력이 포맷 문자열로 직접 사용될 때 발생합니다. 공격자가 %x, %n 등을 입력하여 메모리를 읽거나 쓸 수 있습니다."
    },
    {
      id: 16,
      category: "Format String",
      question: "printf(\"%x\")에서 %x의 역할은?",
      options: [
        "문자열 출력",
        "정수를 10진수로 출력",
        "스택에서 값을 읽어 16진수로 출력",
        "메모리에 값 쓰기",
        "줄바꿈 출력"
      ],
      answer: 2,
      explanation: "%x는 스택에서 4바이트 값을 읽어 16진수 형태로 출력합니다. Format String 공격에서 스택 내용을 유출하는 데 사용됩니다."
    },
    {
      id: 17,
      category: "Format String",
      question: "%n 포맷 지정자의 기능은?",
      options: [
        "줄바꿈 출력",
        "숫자 출력",
        "지금까지 출력된 문자 수를 지정된 주소에 쓰기",
        "문자열 출력",
        "포인터 주소 출력"
      ],
      answer: 2,
      explanation: "%n은 지금까지 printf로 출력된 문자의 개수를 인자로 전달된 주소에 씁니다. 이를 악용하면 임의의 메모리 주소에 값을 쓸 수 있습니다."
    },
  
    // ===== Race Condition 기초 =====
    {
      id: 18,
      category: "Race Condition",
      question: "Race Condition이란 무엇인가?",
      options: [
        "프로그램 실행 속도 경쟁",
        "두 개 이상의 프로세스가 공유 자원에 동시 접근할 때 발생하는 보안 문제",
        "CPU 성능 문제",
        "메모리 부족 현상",
        "네트워크 지연 문제"
      ],
      answer: 1,
      explanation: "Race Condition은 여러 프로세스가 공유 자원에 접근하는 순서에 따라 결과가 달라지는 상황입니다. 공격자가 이 타이밍을 악용할 수 있습니다."
    },
    {
      id: 19,
      category: "Race Condition",
      question: "TOCTTOU 공격이란?",
      options: [
        "네트워크 공격의 일종",
        "파일 검사(Check)와 사용(Use) 사이의 시간 차를 악용하는 공격",
        "암호 해독 공격",
        "피싱 공격",
        "DDoS 공격"
      ],
      answer: 1,
      explanation: "TOCTTOU(Time Of Check To Time Of Use)는 파일 접근 권한을 검사하는 시점과 실제 파일을 사용하는 시점 사이에 파일을 바꿔치기하는 공격입니다."
    },
    {
      id: 20,
      category: "Race Condition",
      question: "심볼릭 링크(Symbolic Link)란?",
      options: [
        "파일의 복사본",
        "다른 파일이나 디렉토리를 가리키는 특수한 파일",
        "암호화된 파일",
        "압축된 파일",
        "실행 파일"
      ],
      answer: 1,
      explanation: "심볼릭 링크는 다른 파일이나 디렉토리의 경로를 가리키는 특수한 파일입니다. Race Condition 공격에서 파일을 바꿔치기하는 데 자주 사용됩니다."
    },
  
    // ===== 방어 기법 기초 =====
    {
      id: 21,
      category: "방어 기법",
      question: "ASLR(Address Space Layout Randomization)의 목적은?",
      options: [
        "프로그램 실행 속도 향상",
        "메모리 주소를 무작위로 배치하여 공격자의 주소 예측을 어렵게 함",
        "파일 암호화",
        "네트워크 보안",
        "사용자 인증"
      ],
      answer: 1,
      explanation: "ASLR은 스택, 힙, 라이브러리 등의 메모리 주소를 매번 무작위로 배치하여 공격자가 특정 주소를 예측하기 어렵게 만드는 방어 기법입니다."
    },
    {
      id: 22,
      category: "방어 기법",
      question: "DEP(Data Execution Prevention) 또는 NX bit의 역할은?",
      options: [
        "데이터 암호화",
        "데이터 영역(스택, 힙)에서의 코드 실행을 방지",
        "네트워크 필터링",
        "파일 접근 제어",
        "사용자 인증"
      ],
      answer: 1,
      explanation: "DEP/NX bit는 스택이나 힙 같은 데이터 영역에서 코드가 실행되는 것을 방지합니다. 이로써 shellcode 주입 공격을 어렵게 만듭니다."
    },
    {
      id: 23,
      category: "방어 기법",
      question: "Stack Canary의 역할은?",
      options: [
        "스택 크기 확장",
        "버퍼와 Return Address 사이에 랜덤 값을 넣어 오버플로우 탐지",
        "메모리 암호화",
        "네트워크 모니터링",
        "파일 무결성 검사"
      ],
      answer: 1,
      explanation: "Stack Canary는 버퍼와 Return Address 사이에 랜덤 값을 배치합니다. 버퍼 오버플로우 발생 시 이 값이 변경되면 프로그램이 종료되어 공격을 방지합니다."
    },
  
    // ===== TEE 기초 =====
    {
      id: 24,
      category: "TEE",
      question: "ARM TrustZone에서 Normal World와 Secure World의 차이는?",
      options: [
        "속도 차이만 있다",
        "Normal World는 일반 OS가, Secure World는 민감한 데이터를 처리하는 보안 OS가 동작한다",
        "저장 용량 차이만 있다",
        "네트워크 연결 여부의 차이",
        "화면 해상도 차이"
      ],
      answer: 1,
      explanation: "TrustZone에서 Normal World는 Android/Linux 같은 일반 OS가 동작하고, Secure World는 암호화 키, 생체정보 등 민감한 데이터를 처리하는 보안 환경입니다."
    },
    {
      id: 25,
      category: "TEE",
      question: "TEE(Trusted Execution Environment)의 주요 목적은?",
      options: [
        "게임 성능 향상",
        "민감한 데이터와 코드를 안전하게 보호하는 격리된 실행 환경 제공",
        "화면 밝기 조절",
        "배터리 절약",
        "와이파이 속도 향상"
      ],
      answer: 1,
      explanation: "TEE는 메인 OS가 해킹되어도 민감한 데이터(암호화 키, 결제 정보, 생체정보 등)를 안전하게 보호할 수 있는 격리된 실행 환경을 제공합니다."
    }
  ];

  export default function TestPage3() {
    return (
        <MockExamTemplate 
        quizData={quizData} 
        title="소시보" 
        subtitle="모의 시험 3" 
        />
    );
}