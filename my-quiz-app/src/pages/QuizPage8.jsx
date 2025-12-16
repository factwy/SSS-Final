import QuizTemplate from './QuizTemplate';

const quizData = [
  {
    id: 1,
    category: "Linux Basics",
    question: "리눅스 파일 시스템 계층 구조에서 시스템 관리자(Root)의 홈 디렉토리는 무엇인가?",
    options: ["/home/root", "/root", "/admin", "/usr/root", "/bin/root"],
    answer: 1,
    explanation: "FHS(Filesystem Hierarchy Standard)에 따르면 일반 사용자의 홈 디렉토리는 /home 밑에 위치하지만, 루트 사용자의 홈 디렉토리는 /root입니다."
  },
  {
    id: 2,
    category: "Linux Basics",
    question: "리눅스에서 파일 권한(Permission)을 숫자로 표현할 때, '읽기(Read)' 권한에 해당하는 숫자는?",
    options: ["1", "2", "3", "4", "7"],
    answer: 3,
    explanation: "리눅스 권한에서 읽기(r)는 4, 쓰기(w)는 2, 실행(x)은 1로 표현됩니다."
  },
  {
    id: 3,
    category: "Linux Basics",
    question: "현재 디렉토리의 절대 경로를 확인하기 위해 사용하는 리눅스 명령어는?",
    options: ["ls", "cd", "pwd", "mkdir", "mv"],
    answer: 2,
    explanation: "pwd(Print Working Directory) 명령어는 현재 작업 중인 디렉토리의 절대 경로를 출력합니다."
  },
  {
    id: 4,
    category: "Linux Basics",
    question: "다음 중 디렉토리와 그 하위 내용을 모두 강제로 삭제하기 위한 명령어 조합으로 가장 적절한 것은?",
    options: ["rm file", "rm -r directory", "rm -ri directory", "rmdir directory", "cp -a directory"],
    answer: 1,
    explanation: "rm 명령어에 -r(recursive) 옵션을 사용하여 디렉토리와 내부 파일을 삭제할 수 있습니다. (강제 삭제 시 -f 옵션도 자주 쓰이나 보기 중에서는 -r이 가장 적절함)"
  },
  {
    id: 5,
    category: "Linux Basics",
    question: "파일의 내용을 화면에 출력하거나 두 개 이상의 파일을 연결하여 출력할 때 사용하는 명령어는?",
    options: ["echo", "touch", "cat", "ls", "mv"],
    answer: 2,
    explanation: "cat(concatenate) 명령어는 파일의 내용을 표준 출력으로 내보내거나 파일을 합칠 때 사용합니다."
  },
  {
    id: 6,
    category: "Assembly (x86)",
    question: "Intel 문법(Syntax)과 AT&T 문법의 차이점에 대한 설명으로 올바른 것은?",
    options: [
      "Intel 문법은 소스(Source)가 먼저 온다.",
      "AT&T 문법은 목적지(Destination)가 먼저 온다.",
      "Intel 문법은 레지스터 앞에 %를 붙인다.",
      "Intel 문법은 목적지(Destination)가 먼저 오고, AT&T는 소스(Source)가 먼저 온다.",
      "AT&T 문법은 상수에 접두사를 붙이지 않는다."
    ],
    answer: 3,
    explanation: "Intel 문법은 'Opcode Dest, Src' 순서이고, AT&T 문법은 'Opcode Src, Dest' 순서입니다."
  },
  {
    id: 7,
    category: "Assembly (x86)",
    question: "x86 아키텍처에서 스택 포인터(Stack Pointer)를 저장하는 레지스터는?",
    options: ["EAX", "EBX", "ECX", "ESP", "EIP"],
    answer: 3,
    explanation: "ESP(Extended Stack Pointer)는 현재 스택의 최상단(Top) 주소를 가리키는 레지스터입니다."
  },
  {
    id: 8,
    category: "Assembly (x86)",
    question: "함수의 리턴 값(Return Value)을 저장하기 위해 관례적으로 사용되는 범용 레지스터는?",
    options: ["EAX", "EBX", "ECX", "EDX", "ESI"],
    answer: 0,
    explanation: "x86 아키텍처에서 함수 실행 후 리턴 값은 주로 EAX 레지스터에 저장됩니다."
  },
  {
    id: 9,
    category: "Assembly (x86)",
    question: "리틀 엔디안(Little-endian) 방식에서 0x0A0B0C0D라는 값을 메모리에 저장할 때, 가장 낮은 주소에 저장되는 바이트는?",
    options: ["0A", "0B", "0C", "0D", "00"],
    answer: 3,
    explanation: "리틀 엔디안은 하위 바이트(Least Significant Byte)를 낮은 메모리 주소에 저장하므로 0D가 가장 먼저 저장됩니다."
  },
  {
    id: 10,
    category: "Assembly (x86)",
    question: "다음 어셈블리 명령어 'mov eax, [ebx]'의 의미로 올바른 것은?",
    options: [
      "ebx의 값을 eax로 복사한다.",
      "ebx가 가리키는 메모리 주소의 값을 eax로 복사한다.",
      "eax의 값을 ebx가 가리키는 메모리 주소로 복사한다.",
      "ebx의 주소값 자체를 eax로 가져온다.",
      "eax와 ebx의 값을 교환한다."
    ],
    answer: 1,
    explanation: "대괄호([])는 메모리 참조(Dereference)를 의미하므로, ebx에 저장된 주소로 가서 그곳에 있는 값을 eax로 옮기는 명령어입니다."
  },
  {
    id: 11,
    category: "Assembly (x86)",
    question: "스택(Stack) 메모리 구조에서 'PUSH' 명령어가 실행될 때 ESP의 변화는?",
    options: [
      "ESP 값이 증가한다.",
      "ESP 값이 감소한다.",
      "ESP 값은 변하지 않는다.",
      "EBP 값이 증가한다.",
      "EBP 값이 감소한다."
    ],
    answer: 1,
    explanation: "x86 아키텍처에서 스택은 높은 주소에서 낮은 주소로 자라납니다(Grows downwards). 따라서 데이터를 PUSH하면 ESP 값은 감소합니다."
  },
  {
    id: 12,
    category: "Assembly (x86)",
    question: "함수 프롤로그(Function Prologue)에서 일반적으로 수행되는 명령어 순서는?",
    options: [
      "push ebp; mov ebp, esp",
      "mov ebp, esp; push ebp",
      "pop ebp; ret",
      "sub esp, 0x10; push ebp",
      "leave; ret"
    ],
    answer: 0,
    explanation: "함수가 호출되면 이전 함수의 EBP를 스택에 저장(push ebp)하고, 현재 스택 포인터(ESP)를 새로운 베이스 포인터(EBP)로 설정(mov ebp, esp)합니다."
  },
  {
    id: 13,
    category: "Assembly (x86)",
    question: "어셈블리 명령어 'test eax, eax' 실행 후 값이 0일 때 세팅되는 플래그와, 이를 검사하여 점프하는 명령어의 짝으로 옳은 것은?",
    options: [
      "SF(Sign Flag) - JS",
      "ZF(Zero Flag) - JE(JZ)",
      "OF(Overflow Flag) - JO",
      "CF(Carry Flag) - JC",
      "PF(Parity Flag) - JP"
    ],
    answer: 1,
    explanation: "test 명령어는 AND 연산을 수행하며 결과가 0이면 ZF(Zero Flag)가 1로 세팅됩니다. JE(Jump if Equal) 또는 JZ(Jump if Zero)는 ZF가 1일 때 점프합니다."
  },
  {
    id: 14,
    category: "Assembly (x86)",
    question: "다음 중 'leave' 명령어와 동일한 동작을 수행하는 명령어 조합은?",
    options: [
      "push ebp; mov ebp, esp",
      "mov esp, ebp; pop ebp",
      "pop ebp; ret",
      "mov ebp, esp; pop ebp",
      "pop esp; pop ebp"
    ],
    answer: 1,
    explanation: "leave 명령어는 함수 에필로그에서 스택 프레임을 정리하는 역할을 하며, 'mov esp, ebp'로 ESP를 복구하고 'pop ebp'로 이전 EBP를 복구합니다."
  },
  {
    id: 15,
    category: "Assembly (x86)",
    question: "조건 분기 명령어 중 'unsigned' 비교에서 'A가 B보다 클 때' 점프하는 명령어는?",
    options: ["JG (Jump Greater)", "JL (Jump Less)", "JA (Jump Above)", "JB (Jump Below)", "JE (Jump Equal)"],
    answer: 2,
    explanation: "부호가 없는(unsigned) 비교에서는 Above/Below를 사용하고, 부호가 있는(signed) 비교에서는 Greater/Less를 사용합니다. 따라서 JA입니다."
  },
  {
    id: 16,
    category: "Memory Layout",
    question: "프로세스 메모리 구조 중, 동적 할당(malloc 등)에 사용되며 낮은 주소에서 높은 주소로 자라나는 영역은?",
    options: ["Stack", "Heap", "BSS", "Data", "Text"],
    answer: 1,
    explanation: "Heap 영역은 동적 메모리 할당에 사용되며, 일반적으로 낮은 주소에서 높은 주소 방향으로 성장합니다."
  },
  {
    id: 17,
    category: "Memory Layout",
    question: "초기화되지 않은 전역 변수나 정적 변수(Static Variable)가 저장되는 메모리 영역은?",
    options: ["Text", "Data", "BSS", "Heap", "Stack"],
    answer: 2,
    explanation: "BSS(Block Started by Symbol) 영역은 초기화되지 않은 전역 변수나 정적 변수가 저장되며 0으로 초기화됩니다."
  },
  {
    id: 18,
    category: "Buffer Overflow",
    question: "스택 버퍼 오버플로우(Stack Buffer Overflow) 공격의 핵심 원리는 무엇인가?",
    options: [
      "힙 영역의 데이터를 변조한다.",
      "함수의 리턴 주소(Return Address)를 덮어써서 실행 흐름을 조작한다.",
      "변수의 타입을 강제로 변환한다.",
      "시스템의 시간을 변경한다.",
      "파일 권한을 777로 변경한다."
    ],
    answer: 1,
    explanation: "스택 버퍼 오버플로우는 할당된 버퍼보다 많은 데이터를 입력하여 스택에 저장된 리턴 주소(Return Address)를 공격자가 원하는 주소로 덮어쓰는 공격입니다."
  },
  {
    id: 19,
    category: "Buffer Overflow",
    question: "다음 C 함수 중 버퍼의 길이를 체크하지 않아 버퍼 오버플로우 취약점이 발생하기 쉬운 함수는?",
    options: ["strncpy", "fgets", "scanf('%s')", "snprintf", "malloc"],
    answer: 2,
    explanation: "scanf('%s', ...)는 입력받는 문자열의 길이를 제한하지 않으므로 버퍼 오버플로우에 취약합니다. (gets, strcpy 등도 마찬가지)"
  },
  {
    id: 20,
    category: "Software Attacks",
    question: "1988년에 발생한 최초의 웜 중 하나로, fingerd 데몬의 버퍼 오버플로우 취약점을 이용한 것은?",
    options: ["Morris Worm", "Code Red", "Slammer", "Stuxnet", "WannaCry"],
    answer: 0,
    explanation: "모리스 웜(Morris Worm)은 1988년에 fingerd의 버퍼 오버플로우 취약점 등을 이용하여 전파된 최초의 웜 중 하나입니다."
  },
  {
    id: 21,
    category: "Software Attacks",
    question: "함수 호출 시 스택에 저장되는 정보가 아닌 것은?",
    options: ["함수의 인자(Arguments)", "리턴 주소(Return Address)", "이전 함수의 EBP(Saved EBP)", "지역 변수(Local Variables)", "전역 변수(Global Variables)"],
    answer: 4,
    explanation: "전역 변수는 스택이 아닌 Data 영역이나 BSS 영역에 저장됩니다."
  },
  {
    id: 22,
    category: "Shellcode",
    question: "셸코드(Shellcode)란 무엇인가?",
    options: [
      "셸 스크립트로 작성된 코드",
      "C언어로 작성된 셸 프로그램",
      "취약점을 이용하여 시스템의 셸(Shell)을 실행시키기 위한 기계어 코드",
      "시스템 설정을 변경하는 파이썬 코드",
      "DB 쿼리문"
    ],
    answer: 2,
    explanation: "셸코드는 공격자가 취약점을 이용해 제어권을 획득한 후 셸(/bin/sh 등)을 실행하기 위해 메모리에 주입하는 기계어(Machine Code) 조각입니다."
  },
  {
    id: 23,
    category: "System Calls",
    question: "리눅스 x86(32bit) 환경에서 시스템 콜(System Call)을 수행하기 위해 사용하는 인터럽트 명령어는?",
    options: ["int 0x10", "int 0x21", "int 0x80", "syscall", "sysenter"],
    answer: 2,
    explanation: "리눅스 32비트(x86) 환경에서는 'int 0x80' 명령어를 통해 유저 모드에서 커널 모드로 전환하며 시스템 콜을 요청합니다."
  },
  {
    id: 24,
    category: "System Calls",
    question: "x86 시스템 콜에서 시스템 콜 번호는 어떤 레지스터에 저장하고 호출해야 하는가?",
    options: ["EAX", "EBX", "ECX", "EDX", "ESI"],
    answer: 0,
    explanation: "시스템 콜을 호출할 때, 수행하고자 하는 시스템 콜의 번호(예: exit=1, write=4 등)를 EAX 레지스터에 저장합니다."
  },
  {
    id: 25,
    category: "Protection Rings",
    question: "x86 아키텍처의 Protection Ring 중, 커널(Kernel)이 실행되는 가장 권한이 높은 레벨은?",
    options: ["Ring 0", "Ring 1", "Ring 2", "Ring 3", "Ring -1"],
    answer: 0,
    explanation: "x86 보호 링 구조에서 Ring 0는 커널 모드로 가장 높은 권한을 가지며, Ring 3는 유저 모드로 가장 낮은 권한을 가집니다."
  },
  {
    id: 26,
    category: "Shellcode",
    question: "셸코드 작성 시 NULL 바이트(0x00)를 제거해야 하는 주된 이유는?",
    options: [
      "메모리를 절약하기 위해",
      "CPU가 0x00을 해석하지 못하기 때문에",
      "strcpy나 scanf 같은 문자열 함수들이 NULL을 문자열의 끝으로 인식하여 복사를 중단하기 때문에",
      "0x00은 바이러스 백신에 쉽게 탐지되기 때문에",
      "NULL 바이트는 스택에 들어갈 수 없기 때문에"
    ],
    answer: 2,
    explanation: "취약한 함수(strcpy 등)는 NULL 바이트를 만나면 문자열의 끝으로 인식하여 복사를 멈추기 때문에, 셸코드가 중간에 잘리지 않게 하려면 NULL을 제거해야 합니다."
  },
  {
    id: 27,
    category: "Shellcode",
    question: "어셈블리에서 'mov eax, 0' 대신 NULL 바이트가 생기지 않도록 0을 만드는 명령어는?",
    options: ["mov eax, null", "xor eax, eax", "add eax, 0", "sub eax, 0", "push 0"],
    answer: 1,
    explanation: "'xor eax, eax'는 자기 자신과 XOR 연산을 수행하여 0을 만듭니다. 이 기계어 코드는 NULL(0x00) 바이트를 포함하지 않아 셸코드 작성 시 자주 사용됩니다."
  },
  {
    id: 28,
    category: "System Calls",
    question: "리눅스 x86 시스템 콜에서 'exit' 시스템 콜의 번호는?",
    options: ["0", "1", "4", "11", "0x80"],
    answer: 1,
    explanation: "리눅스 32비트 x86 아키텍처에서 exit 시스템 콜의 번호는 1번입니다."
  },
  {
    id: 29,
    category: "System Calls",
    question: "새로운 프로세스를 현재 프로세스의 이미지로 교체하여 실행하는 시스템 콜로, 셸을 실행할 때 주로 사용되는 것은?",
    options: ["fork", "wait", "execve", "open", "read"],
    answer: 2,
    explanation: "execve 시스템 콜(번호 11/0x0b)은 호출한 프로세스를 새로운 프로그램(예: /bin/sh)으로 덮어씌워 실행합니다."
  },
  {
    id: 30,
    category: "Shellcode",
    question: "'/bin/sh' 문자열을 스택에 넣을 때, 리틀 엔디안 방식과 4바이트 정렬을 고려하여 '//sh'와 같이 슬래시를 추가하는 이유는?",
    options: [
      "경로를 숨기기 위해",
      "4바이트 단위로 스택에 push 하기 위해 길이를 맞추려고",
      "리눅스 커널 버그를 유발하기 위해",
      "권한 상승을 위해",
      "NULL 바이트를 추가하기 위해"
    ],
    answer: 1,
    explanation: "x86 스택 연산은 주로 4바이트 단위로 이루어지므로, '/bin/sh'(7바이트)를 8바이트로 맞춰 PUSH하기 쉽도록 슬래시(/)를 하나 더 추가하여 '/bin//sh' 형태로 만듭니다. (리눅스에서 연속된 슬래시는 하나로 취급됨)"
  },
  {
    id: 31,
    category: "Exploit Tools",
    question: "바이너리 파일의 어셈블리 코드를 확인하기 위해 디스어셈블(disassemble) 기능을 제공하는 리눅스 툴은?",
    options: ["gcc", "make", "objdump", "netstat", "vi"],
    answer: 2,
    explanation: "objdump -d [파일명] 명령어를 사용하면 바이너리 파일의 섹션을 디스어셈블하여 어셈블리 코드를 볼 수 있습니다."
  },
  {
    id: 32,
    category: "Exploit Tools",
    question: "프로그램 실행 중에 발생하는 시스템 콜(System Call)을 추적하여 보여주는 도구는?",
    options: ["ltrace", "strace", "gdb", "nmap", "wireshark"],
    answer: 1,
    explanation: "strace는 프로그램이 실행되면서 호출하는 시스템 콜과 그 반환값을 추적하는 도구입니다."
  },
  {
    id: 33,
    category: "Software Defense",
    question: "스택 영역에서 코드가 실행되는 것을 방지하기 위한 메모리 보호 기법과 관련된 gcc 컴파일 옵션은?",
    options: ["-fno-stack-protector", "-z execstack", "-static", "-g", "-O2"],
    answer: 1,
    explanation: "-z execstack 옵션은 스택 영역에 실행 권한을 부여하는 옵션입니다. 반대로 스택 실행을 방지하려면(NX bit/DEP) 이 옵션을 끄거나 -z noexecstack을 사용합니다. (문제 문맥상 스택 실행을 '허용'하여 셸코드 실습을 할 때 쓰는 옵션으로 강의에서 언급됨)"
  },
  {
    id: 34,
    category: "Assembly (x86)",
    question: "명령어 'LEA EAX, [EBX+4]'와 'MOV EAX, [EBX+4]'의 차이점은?",
    options: [
      "LEA는 덧셈만 하고 주소값을 가져오고, MOV는 해당 주소의 메모리 값을 가져온다.",
      "LEA는 메모리 값을 가져오고, MOV는 주소값을 가져온다.",
      "두 명령어는 완전히 동일하다.",
      "LEA는 스택을 조작하고, MOV는 힙을 조작한다.",
      "LEA는 조건부 전송 명령어이다."
    ],
    answer: 0,
    explanation: "LEA(Load Effective Address)는 주소 계산만 하여 그 주소값 자체를 레지스터에 저장하고, MOV ... []는 계산된 주소에 있는 실제 데이터(메모리 값)를 가져옵니다."
  },
  {
    id: 35,
    category: "Stack Operation",
    question: "함수 에필로그에서 'ret' 명령어가 실행될 때 일어나는 동작은?",
    options: [
      "스택에서 값을 꺼내 EIP(Instruction Pointer)에 저장하고 해당 주소로 점프한다.",
      "스택에 현재 EIP를 저장한다.",
      "ESP 값을 0으로 만든다.",
      "프로그램을 종료한다.",
      "EBP 값을 스택에 저장한다."
    ],
    answer: 0,
    explanation: "ret(Return) 명령어는 스택의 Top(ESP가 가리키는 곳)에 있는 값(리턴 주소)을 POP하여 EIP 레지스터에 넣음으로써, 호출되었던 원래 위치로 실행 흐름을 되돌립니다."
  },
  {
    id: 36,
    category: "Buffer Overflow",
    question: "버퍼 오버플로우 공격 시 공격자가 셸코드로 점프하기 위해 덮어써야 하는 핵심 데이터는?",
    options: ["SFP (Saved Frame Pointer)", "RET (Return Address)", "Local Variable", "Function Arguments", "Buffer"],
    answer: 1,
    explanation: "공격의 최종 목표는 RET(리턴 주소)를 공격자가 원하는 코드(셸코드 등)의 주소로 덮어써서 함수가 종료될 때 그곳으로 점프하게 만드는 것입니다."
  },
  {
    id: 37,
    category: "GDB",
    question: "GDB 디버거에서 특정 함수의 어셈블리 코드를 보기 위해 사용하는 명령어는?",
    options: ["run", "break", "disassemble (disas)", "next", "list"],
    answer: 2,
    explanation: "disassemble(또는 disas) 명령어를 사용하면 현재 함수나 지정된 함수의 어셈블리 코드를 볼 수 있습니다."
  },
  {
    id: 38,
    category: "GDB",
    question: "GDB에서 인텔(Intel) 문법으로 어셈블리 코드를 보기 위해 설정하는 명령어는?",
    options: [
      "set architecture intel",
      "set disassembly-flavor intel",
      "mode intel",
      "syntax intel",
      "display intel"
    ],
    answer: 1,
    explanation: "GDB의 기본 설정은 AT&T 문법이므로, 'set disassembly-flavor intel' 명령어를 통해 인텔 문법으로 변경할 수 있습니다."
  },
  {
    id: 39,
    category: "Assembly (x86)",
    question: "32비트 레지스터 EAX의 하위 16비트를 가리키는 이름은?",
    options: ["AL", "AH", "AX", "RAX", "EAXL"],
    answer: 2,
    explanation: "EAX(32비트)의 하위 16비트는 AX이며, AX는 다시 상위 8비트 AH와 하위 8비트 AL로 나뉩니다."
  },
  {
    id: 40,
    category: "Software Attacks",
    question: "NOP Sled(NOP Slide)란 무엇인가?",
    options: [
      "프로그램을 종료시키는 코드",
      "아무 동작도 하지 않는 NOP(0x90) 명령어를 연속으로 배치하여, 실행 흐름이 셸코드로 자연스럽게 미끄러지듯 도달하게 하는 기법",
      "스택의 크기를 줄이는 기법",
      "NULL 바이트를 제거하는 기법",
      "디버깅을 방지하는 기법"
    ],
    answer: 1,
    explanation: "NOP(No Operation, 0x90)은 실행 시 아무 일도 하지 않고 다음 명령어로 넘어갑니다. 공격자는 주소를 정확히 맞추기 어려울 때 NOP을 셸코드 앞에 다수 배치하여 확률을 높입니다."
  },
  {
    id: 41,
    category: "System Calls",
    question: "execve 시스템 콜을 호출할 때 환경 변수(envp)가 필요 없다면 어떤 값을 전달해야 하는가?",
    options: ["0 (NULL)", "1", "-1", "0xFF", "현재 스택 주소"],
    answer: 0,
    explanation: "execve의 세 번째 인자는 환경 변수 배열의 포인터입니다. 특별한 환경 변수가 필요 없다면 NULL(0)을 전달합니다."
  },
  {
    id: 42,
    category: "Process",
    question: "리눅스에서 현재 실행 중인 프로세스를 복제하여 자식 프로세스를 생성하는 함수는?",
    options: ["clone", "exec", "fork", "copy", "duplicate"],
    answer: 2,
    explanation: "fork() 시스템 콜은 현재 프로세스를 그대로 복제하여 자식 프로세스를 생성합니다."
  },
  {
    id: 43,
    category: "Assembly (x86)",
    question: "비교 명령어 'CMP A, B'는 내부적으로 어떤 연산을 수행하여 플래그를 세팅하는가?",
    options: ["A + B", "A - B", "A AND B", "A XOR B", "A OR B"],
    answer: 1,
    explanation: "CMP(Compare) 명령어는 두 피연산자 간의 뺄셈(SUB)을 수행하되, 결과값은 저장하지 않고 플래그(ZF, SF 등)만 업데이트합니다."
  },
  {
    id: 44,
    category: "Shellcode",
    question: "리눅스 셸코드 제작 시, 셸(/bin/sh)을 실행하기 위해 execve의 첫 번째 인자로 전달해야 하는 것은?",
    options: [
      "/bin/sh 문자열의 주소",
      "/bin/sh 문자열 자체",
      "NULL",
      "파일 디스크립터",
      "환경 변수"
    ],
    answer: 0,
    explanation: "execve 시스템 콜의 첫 번째 인자(EBX)는 실행할 파일의 경로 문자열이 저장된 메모리 주소(Pointer)여야 합니다."
  },
  {
    id: 45,
    category: "Tools",
    question: "어셈블리어 소스 파일(.asm)을 컴파일하여 오브젝트 파일(.o)로 만들어주는 도구는?",
    options: ["ld", "nasm", "cat", "gdb", "python"],
    answer: 1,
    explanation: "nasm(Netwide Assembler)은 어셈블리 소스 코드를 기계어 오브젝트 파일로 어셈블(assemble)해주는 도구입니다."
  },
  {
    id: 46,
    category: "Tools",
    question: "오브젝트 파일(.o)을 링크하여 최종 실행 파일(ELF)을 생성하는 도구는?",
    options: ["ld", "nasm", "objdump", "strace", "vi"],
    answer: 0,
    explanation: "ld(GNU Linker)는 여러 오브젝트 파일이나 라이브러리를 묶어(Linking) 실행 가능한 파일을 생성합니다."
  },
  {
    id: 47,
    category: "Memory Layout",
    question: "스택 프레임에서 지역 변수(Local Variable)에 접근할 때 기준이 되는 레지스터는?",
    options: ["EIP", "EBP", "EAX", "ECX", "ESI"],
    answer: 1,
    explanation: "x86 함수 내에서 지역 변수나 파라미터는 베이스 포인터(EBP)를 기준으로 오프셋(예: EBP-4, EBP+8)을 통해 접근합니다."
  },
  {
    id: 48,
    category: "Software Attacks",
    question: "공격자가 스택의 리턴 주소를 변조하여, 메모리에 미리 로드된 라이브러리 함수(예: system())를 호출하는 공격 기법은?",
    options: ["Shellcode Injection", "RTL (Return-to-Libc)", "Heap Spraying", "Race Condition", "SQL Injection"],
    answer: 1,
    explanation: "RTL(Return-to-Libc) 공격은 스택에 실행 권한이 없을 때(NX bit 등), 리턴 주소를 이미 메모리에 적재된 공유 라이브러리 함수(system 등)의 주소로 덮어써서 실행하는 기법입니다."
  },
  {
    id: 49,
    category: "Assembly (x86)",
    question: "다음 중 프로그램 실행 흐름을 무조건 특정 주소로 이동시키는 명령어는?",
    options: ["JMP", "JE", "JNE", "CALL", "CMP"],
    answer: 0,
    explanation: "JMP(Jump) 명령어는 조건 없이 지정된 주소로 실행 흐름을 이동시키는 무조건 분기 명령어입니다."
  },
  {
    id: 50,
    category: "Linux Basics",
    question: "리눅스에서 '/bin' 디렉토리의 주된 용도는?",
    options: [
      "시스템 설정 파일 저장",
      "사용자 홈 디렉토리",
      "기본적인 사용자 명령어(바이너리) 저장",
      "임시 파일 저장",
      "부팅 관련 파일 저장"
    ],
    answer: 2,
    explanation: "FHS에 따르면 /bin 디렉토리는 시스템 부팅과 복구에 필수적인 기본 사용자 명령어(ls, cp, cat 등)의 바이너리 파일들이 위치합니다."
  }
];

export default function QuizPage8() {
  return (
    <QuizTemplate 
      title="소프트웨어 및 시스템 보안" 
      subtitle="메모리 해킹 기초"
      quizData={quizData} 
    />
  );
}