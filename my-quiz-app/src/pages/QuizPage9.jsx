import QuizTemplate from './QuizTemplate';

const quizData = [
  {
    id: 1,
    category: "Assembly",
    question: "x86 아키텍처에서 스택 포인터(Stack Pointer) 역할을 하는 레지스터는 무엇인가?",
    options: ["EAX", "EBX", "ECX", "ESP", "EIP"],
    answer: 3,
    explanation: "ESP(Extended Stack Pointer)는 현재 스택의 가장 윗부분(Top)을 가리키는 레지스터입니다."
  },
  {
    id: 2,
    category: "Assembly",
    question: "함수 호출 시 베이스 포인터(Base Pointer) 역할을 하여 스택 프레임의 기준이 되는 레지스터는?",
    options: ["EBP", "ESP", "ESI", "EDI", "EDX"],
    answer: 0,
    explanation: "EBP(Extended Base Pointer)는 함수 내에서 로컬 변수나 파라미터에 접근할 때 기준점이 되는 레지스터입니다."
  },
  {
    id: 3,
    category: "Assembly",
    question: "다음 중 현재 실행 중인 명령어의 주소를 담고 있는 레지스터(Program Counter)는?",
    options: ["EAX", "ESP", "EBP", "EIP", "EFLAGS"],
    answer: 3,
    explanation: "EIP(Extended Instruction Pointer)는 다음에 실행할 명령어의 주소를 가리킵니다."
  },
  {
    id: 4,
    category: "Assembly",
    question: "AT&T 문법과 Intel 문법의 차이점에 대한 설명으로 옳지 않은 것은?",
    options: [
      "AT&T는 소스(Source)가 먼저 오고 목적지(Destination)가 뒤에 온다.",
      "Intel은 목적지(Destination)가 먼저 오고 소스(Source)가 뒤에 온다.",
      "AT&T 문법에서는 레지스터 앞에 %를 붙인다.",
      "Intel 문법에서는 즉시값(Immediate) 앞에 $를 붙인다.",
      "GDB는 기본적으로 AT&T 문법을 사용한다."
    ],
    answer: 3,
    explanation: "Intel 문법에서는 즉시값 앞에 특수 문자를 붙이지 않지만, AT&T 문법에서는 즉시값 앞에 $를 붙입니다."
  },
  {
    id: 5,
    category: "Assembly",
    question: "x86 아키텍처에서 스택(Stack)이 자라나는 방향은?",
    options: [
      "높은 주소에서 낮은 주소로",
      "낮은 주소에서 높은 주소로",
      "힙(Heap)과 같은 방향으로",
      "랜덤한 방향으로",
      "코드 영역 방향으로"
    ],
    answer: 0,
    explanation: "x86 아키텍처에서 스택은 높은 메모리 주소에서 낮은 메모리 주소 방향으로 성장합니다."
  },
  {
    id: 6,
    category: "Assembly",
    question: "리틀 엔디안(Little-endian) 방식에서 0x0A0B0C0D를 메모리에 저장할 때, 가장 낮은 주소에 저장되는 바이트는?",
    options: ["0A", "0B", "0C", "0D", "00"],
    answer: 3,
    explanation: "리틀 엔디안은 하위 바이트(Least Significant Byte)를 가장 낮은 메모리 주소에 먼저 저장합니다. 따라서 0D가 가장 먼저 저장됩니다."
  },
  {
    id: 7,
    category: "Assembly",
    question: "함수 프롤로그(Prologue)에서 일반적으로 수행되는 명령어 시퀀스는?",
    options: [
      "push ebp; mov ebp, esp",
      "pop ebp; ret",
      "mov esp, ebp; pop ebp",
      "sub esp, 0x10",
      "leave; ret"
    ],
    answer: 0,
    explanation: "함수 시작 시 이전 함수의 EBP를 스택에 저장(push ebp)하고, 현재 ESP를 새로운 EBP로 설정(mov ebp, esp)합니다."
  },
  {
    id: 8,
    category: "Assembly",
    question: "함수 에필로그에서 'leave' 명령어가 수행하는 동작과 동일한 명령어 조합은?",
    options: [
      "push ebp; mov ebp, esp",
      "mov esp, ebp; pop ebp",
      "pop ebp; ret",
      "mov ebp, esp; pop eip",
      "sub esp, 4; pop ebp"
    ],
    answer: 1,
    explanation: "leave 명령어는 스택 포인터를 복구(mov esp, ebp)하고, 저장된 EBP를 복구(pop ebp)하는 역할을 합니다."
  },
  {
    id: 9,
    category: "Buffer Overflow",
    question: "버퍼 오버플로우 공격의 핵심 원리로 가장 적절한 것은?",
    options: [
      "할당된 버퍼의 크기를 초과하여 인접한 메모리 값을 덮어쓰는 것",
      "메모리를 해제한 후 다시 사용하는 것",
      "정수형 변수의 범위를 초과하여 음수로 만드는 것",
      "포맷 스트링 문자를 이용하여 메모리를 읽는 것",
      "레이스 컨디션을 이용하여 권한을 상승시키는 것"
    ],
    answer: 0,
    explanation: "버퍼 오버플로우는 할당된 메모리 경계를 넘어서 데이터를 쓸 때 인접한 메모리(특히 Return Address 등)가 덮어씌워지는 취약점입니다."
  },
  {
    id: 10,
    category: "Buffer Overflow",
    question: "1988년 발생하여 핑거(fingerd) 데몬의 버퍼 오버플로우 취약점을 이용해 수천 대의 컴퓨터를 감염시킨 웜은?",
    options: ["Morris Worm", "Code Red", "Slammer", "Stuxnet", "WannaCry"],
    answer: 0,
    explanation: "로버트 모리스가 제작한 모리스 웜(Morris Worm)은 버퍼 오버플로우를 이용한 최초의 대규모 웜 중 하나입니다."
  },
  {
    id: 11,
    category: "Assembly",
    question: "EFLAGS 레지스터 중 연산 결과가 0일 때 1로 세팅되는 플래그는?",
    options: ["CF (Carry Flag)", "OF (Overflow Flag)", "SF (Sign Flag)", "ZF (Zero Flag)", "PF (Parity Flag)"],
    answer: 3,
    explanation: "ZF(Zero Flag)는 연산 결과가 0일 때 1로 설정됩니다. (예: 두 값이 같을 때 cmp 결과)"
  },
  {
    id: 12,
    category: "Software Defense",
    question: "데이터 영역(스택, 힙 등)에서 코드가 실행되는 것을 방지하는 하드웨어/OS 보호 기법은?",
    options: ["ASLR", "DEP (NX bit)", "Stack Canary", "RELRO", "PIE"],
    answer: 1,
    explanation: "DEP(Data Execution Prevention) 혹은 NX(No-eXecute) 비트는 쓰기 권한이 있는 메모리 영역(데이터 영역)에서 실행 권한을 제거하여 쉘코드 실행을 막습니다."
  },
  {
    id: 13,
    category: "ROP",
    question: "DEP 보호 기법을 우회하기 위해, 프로그램 내에 이미 존재하는 코드 조각(Gadget)들을 연결하여 공격하는 기법은?",
    options: [
      "Heap Spraying",
      "ROP (Return Oriented Programming)",
      "Integer Overflow",
      "Format String Attack",
      "Race Condition"
    ],
    answer: 1,
    explanation: "ROP는 메모리에 로드된 코드 조각(가젯)들을 리턴 주소 조작을 통해 체이닝하여 공격자가 원하는 로직을 실행하는 기법입니다."
  },
  {
    id: 14,
    category: "ROP",
    question: "ROP 공격에서 '가젯(Gadget)'이 반드시 끝날 때 포함해야 하는 명령어는?",
    options: ["call", "jmp", "leave", "ret", "push"],
    answer: 3,
    explanation: "ROP 가젯은 다음 가젯으로 제어권을 넘기기 위해 반드시 'ret' 명령어로 끝나야 스택에 있는 다음 주소를 EIP로 가져올 수 있습니다."
  },
  {
    id: 15,
    category: "Assembly",
    question: "다음 어셈블리 명령어 `mov eax, [ebp+0x8]`의 의미로 가장 적절한 것은?",
    options: [
      "EBP 레지스터 값에 8을 더해서 EAX에 저장",
      "EAX 레지스터 값을 EBP+8 주소에 저장",
      "EBP+8 주소에 있는 메모리 값을 읽어서 EAX에 저장 (첫 번째 파라미터 접근)",
      "EBP+8 주소로 점프",
      "EBP 레지스터를 8만큼 증가"
    ],
    answer: 2,
    explanation: "대괄호 `[]`는 메모리 참조를 의미하며, `ebp+0x8`은 일반적으로 32비트 x86 함수 호출 규약에서 첫 번째 파라미터가 위치한 곳입니다."
  },
  {
    id: 16,
    category: "Assembly",
    question: "CALL 명령어가 실행될 때 스택에서 일어나는 동작은?",
    options: [
      "현재 EIP(리턴 주소)를 스택에 PUSH하고 점프한다.",
      "현재 EBP를 스택에 PUSH하고 점프한다.",
      "스택 내용을 모두 비우고 점프한다.",
      "아무 동작 없이 점프만 한다.",
      "ESP 값을 EIP에 복사한다."
    ],
    answer: 0,
    explanation: "CALL 명령어는 함수 실행 후 되돌아올 주소(Next Instruction Address)를 스택에 PUSH한 뒤 해당 함수 주소로 점프합니다."
  },
  {
    id: 17,
    category: "Assembly",
    question: "RET 명령어가 실행될 때 일어나는 동작은?",
    options: [
      "EBP를 POP하여 ESP에 저장한다.",
      "스택의 Top에 있는 값(리턴 주소)을 POP하여 EIP에 저장(점프)한다.",
      "프로그램을 종료한다.",
      "함수의 반환값을 EAX에 저장한다.",
      "스택 프레임을 제거한다."
    ],
    answer: 1,
    explanation: "RET 명령어는 스택 최상단에 저장된 리턴 주소를 꺼내어(POP) EIP 레지스터에 설정함으로써 호출 지점으로 복귀합니다."
  },
  {
    id: 18,
    category: "ROP",
    question: "ROP에서 `pop; pop; ret` 가젯을 사용하는 주된 이유는?",
    options: [
      "스택 오버플로우를 발생시키기 위해",
      "함수 호출 후 스택에 쌓인 인자(Parameter)들을 정리하고 다음 가젯으로 이동하기 위해",
      "시스템 콜을 호출하기 위해",
      "쉘코드를 실행하기 위해",
      "메모리 릭을 유발하기 위해"
    ],
    answer: 1,
    explanation: "함수 호출 시 스택에 쌓은 인자들을 건너뛰고(POP으로 제거하고) 다음 가젯으로 제어 흐름을 연결하기 위해 사용합니다."
  },
  {
    id: 19,
    category: "ROP",
    question: "일반적인 프로그램 실행에서 EIP가 제어 흐름을 결정한다면, ROP 공격에서 실질적으로 EIP 역할을 하는 레지스터는?",
    options: ["EAX", "EBX", "ESP", "EBP", "ESI"],
    answer: 2,
    explanation: "ROP는 `ret` 명령어를 통해 스택에 있는 주소들을 연속적으로 실행하므로, 스택 포인터(ESP)가 가리키는 값들이 실행 흐름을 결정하게 됩니다."
  },
  {
    id: 20,
    category: "Software Attacks",
    question: "x86 명령어(Instruction)의 길이가 가변적(Variable length)이기 때문에 발생하는 ROP 관련 특징은?",
    options: [
      "가젯을 찾기가 매우 어렵다.",
      "의도하지 않은 명령어(Unintended Instruction)를 찾아서 가젯으로 활용할 수 있다.",
      "ARM 아키텍처보다 가젯 수가 적다.",
      "리틀 엔디안 방식 때문에 공격이 불가능하다.",
      "모든 명령어가 4바이트로 정렬된다."
    ],
    answer: 1,
    explanation: "x86은 가변 길이 명령어셋을 가지므로, 명령어의 중간 바이트부터 디스어셈블하면 원래 의도와 다른 명령어(Unintended Instruction)로 해석될 수 있어 가젯 확보에 유리합니다."
  },
  {
    id: 21,
    category: "Buffer Overflow",
    question: "스택 버퍼 오버플로우 공격 시, 공격자가 최종적으로 덮어쓰고자 하는 대상은?",
    options: ["로컬 변수", "이전 함수의 EBP", "함수의 리턴 주소 (Return Address)", "함수의 파라미터", "힙 메모리 주소"],
    answer: 2,
    explanation: "공격자는 버퍼를 넘치게 채워 리턴 주소(Saved EIP)를 자신이 원하는 주소(쉘코드 주소나 ROP 가젯 주소)로 조작하여 실행 흐름을 탈취합니다."
  },
  {
    id: 22,
    category: "Assembly",
    question: "`test eax, eax` 명령어 수행 후 `jz` (Jump if Zero)가 발생하려면 EAX의 값은?",
    options: ["0", "1", "-1", "0xFFFFFFFF", "임의의 값"],
    answer: 0,
    explanation: "`test` 명령어는 AND 연산을 수행하며 결과는 저장하지 않고 플래그만 세팅합니다. EAX가 0이면 AND 결과가 0이 되어 ZF가 1이 되고, `jz`가 실행됩니다."
  },
  {
    id: 23,
    category: "Software Defense",
    question: "메모리 보호 기법 중 하나로, 라이브러리, 힙, 스택 등의 메모리 주소를 프로그램 실행 시마다 랜덤하게 변경하는 기법은?",
    options: ["DEP", "NX Bit", "ASLR (Address Space Layout Randomization)", "Canary", "SafeSEH"],
    answer: 2,
    explanation: "ASLR은 메모리 주소 공간을 난수화하여 공격자가 특정 함수나 가젯의 주소를 예측하기 어렵게 만듭니다."
  },
  {
    id: 24,
    category: "ROP",
    question: "ROP 공격이 가능한 근본적인 이유로, ROP가 튜링 완전(Turing Complete)하다는 것의 의미는?",
    options: [
      "ROP로는 덧셈만 가능하다.",
      "ROP로는 분기문(조건문)을 만들 수 없다.",
      "ROP를 이용해 어떠한 프로그램 로직이나 연산도 구현할 수 있다.",
      "ROP는 튜링 머신을 공격하는 데만 쓰인다.",
      "ROP는 무한 루프를 돌 수 없다."
    ],
    answer: 2,
    explanation: "ROP 가젯들을 조합하면 메모리 읽기/쓰기, 산술 연산, 조건 분기 등 모든 프로그래밍 로직을 구현할 수 있다는 의미입니다."
  },
  {
    id: 25,
    category: "Assembly",
    question: "`pop eax` 명령어가 실행되었을 때 스택 포인터(ESP)의 변화는? (32비트 기준)",
    options: ["ESP - 4", "ESP + 4", "ESP 변동 없음", "ESP - 8", "ESP + 8"],
    answer: 1,
    explanation: "pop 명령은 스택에서 값을 꺼내므로 스택 포인터(ESP)는 증가합니다. 32비트(4바이트) 시스템에서는 4만큼 증가합니다."
  },
  {
    id: 26,
    category: "Assembly",
    question: "다음 중 범용 레지스터(General Purpose Register)가 아닌 것은?",
    options: ["EAX", "EBX", "ECX", "EFLAGS", "EDX"],
    answer: 3,
    explanation: "EAX, EBX, ECX, EDX는 범용 레지스터이지만, EFLAGS는 상태 및 제어 플래그를 저장하는 특수 목적 레지스터입니다."
  },
  {
    id: 27,
    category: "Software Attacks",
    question: "쉘코드(Shellcode)라는 용어의 유래와 가장 관련 깊은 것은?",
    options: [
      "조개(Shell) 모양의 코드를 사용해서",
      "공격 성공 시 관리자 쉘(Shell)을 획득하기 위한 코드라서",
      "커널(Kernel)을 보호하는 껍데기라서",
      "파워쉘(PowerShell)을 사용해서",
      "바다에서 발견되어서"
    ],
    answer: 1,
    explanation: "초기 익스플로잇 코드는 주로 공격 대상 시스템에서 명령 쉘(/bin/sh 등)을 실행하여 제어권을 얻는 목적이었기 때문에 쉘코드라 불립니다."
  },
  {
    id: 28,
    category: "Assembly",
    question: "함수의 리턴값은 일반적으로 어떤 레지스터에 저장되어 반환되는가? (x86 cdecl 기준)",
    options: ["EAX", "EBX", "ECX", "ESP", "EBP"],
    answer: 0,
    explanation: "x86 호출 규약(cdecl 등)에서 함수의 반환값(Return Value)은 주로 EAX 레지스터에 저장됩니다."
  },
  {
    id: 29,
    category: "Software Attacks",
    question: "Return-to-Libc 공격은 무엇을 우회하기 위해 주로 사용되었는가?",
    options: ["ASLR", "Stack Canary", "DEP (NX Bit)", "Code Signing", "Encryption"],
    answer: 2,
    explanation: "스택에서 코드를 실행할 수 없는 DEP(NX) 환경에서, 실행 권한이 있는 라이브러리(libc) 함수(예: system())를 호출하여 공격하기 위해 고안되었습니다."
  },
  {
    id: 30,
    category: "Assembly",
    question: "`xor eax, eax` 명령어의 실행 결과로 올바른 것은?",
    options: [
      "EAX 레지스터의 값이 0이 된다.",
      "EAX 레지스터의 값이 1이 된다.",
      "EAX 레지스터의 값이 -1이 된다.",
      "EAX 값이 반전된다.",
      "아무 변화가 없다."
    ],
    answer: 0,
    explanation: "자기 자신과 XOR 연산을 하면 모든 비트가 0이 되므로, 레지스터를 0으로 초기화할 때 자주 사용됩니다."
  },
  {
    id: 31,
    category: "Buffer Overflow",
    question: "버퍼 오버플로우 취약점이 발생하기 쉬운 C언어 함수는?",
    options: ["printf", "scanf", "strcat", "strcpy", "모두 포함"],
    answer: 4,
    explanation: "경계 검사를 하지 않는 strcpy, strcat, scanf(%s 사용 시), gets 등은 모두 버퍼 오버플로우 취약점을 유발할 수 있습니다. (printf는 포맷 스트링 버그와 관련되지만 넓은 의미의 메모리 커럽션 가능)"
  },
  {
    id: 32,
    category: "Stack Mechanics",
    question: "함수 호출 규약 중 'cdecl' 방식에서 함수 인자(Parameter)를 정리(Stack Clean-up)하는 주체는?",
    options: ["호출된 함수 (Callee)", "호출한 함수 (Caller)", "운영체제 (OS)", "컴파일러", "링커"],
    answer: 1,
    explanation: "cdecl 규약에서는 함수를 호출한 쪽(Caller)이 함수 반환 후 스택에 쌓은 인자를 정리(add esp, n)합니다."
  },
  {
    id: 33,
    category: "ROP",
    question: "ROP 공격에서 `Stack Pivoting` 기법을 사용하는 목적은?",
    options: [
      "스택의 크기를 늘리기 위해",
      "스택 포인터(ESP)를 공격자가 구성한 가짜 스택(Fake Stack) 영역으로 옮기기 위해",
      "스택을 힙 영역으로 복사하기 위해",
      "스택 카나리를 우회하기 위해",
      "스택의 실행 권한을 얻기 위해"
    ],
    answer: 1,
    explanation: "공격할 공간(버퍼)이 부족하거나 제약이 있을 때, ESP를 힙이나 다른 메모리 영역으로 돌려서(Pivot) 그곳에 준비된 ROP 체인을 실행하기 위함입니다."
  },
  {
    id: 34,
    category: "Assembly",
    question: "다음 중 조건부 점프 명령어가 아닌 것은?",
    options: ["JE", "JNE", "JMP", "JG", "JLE"],
    answer: 2,
    explanation: "JMP는 무조건 점프(Unconditional Jump) 명령어이며, 나머지는 플래그 상태에 따른 조건부 점프입니다."
  },
  {
    id: 35,
    category: "Assembly",
    question: "`lea eax, [ebx+8]` 명령어와 `mov eax, [ebx+8]` 명령어의 차이점은?",
    options: [
      "차이점이 없다.",
      "lea는 주소값 자체(ebx+8)를 저장하고, mov는 해당 주소의 메모리 값을 저장한다.",
      "mov는 주소값 자체를 저장하고, lea는 해당 주소의 메모리 값을 저장한다.",
      "lea는 덧셈을 할 수 없고 mov는 가능하다.",
      "lea는 스택에서만 사용 가능하다."
    ],
    answer: 1,
    explanation: "LEA(Load Effective Address)는 주소 계산 결과를 저장하고, MOV는 주소가 가리키는 메모리의 데이터를 가져옵니다."
  },
  {
    id: 36,
    category: "Assembly",
    question: "EFLAGS 레지스터의 OF(Overflow Flag)는 언제 1로 설정되는가?",
    options: [
      "부호 없는(Unsigned) 연산 결과가 범위를 초과할 때",
      "부호 있는(Signed) 연산 결과가 비트 범위를 초과하여 부호가 바뀔 때",
      "연산 결과가 0일 때",
      "연산 결과가 음수일 때",
      "자리 올림(Carry)이 발생할 때"
    ],
    answer: 1,
    explanation: "OF는 Signed Arithmetic(부호 있는 연산)에서 오버플로우가 발생했을 때 설정됩니다. (Unsigned는 CF가 담당)"
  },
  {
    id: 37,
    category: "Software Defense",
    question: "스택 버퍼 오버플로우를 탐지하기 위해 리턴 주소 앞에 특정한 값(Cookie)을 삽입하고 함수 종료 시 검증하는 기법은?",
    options: ["DEP", "ASLR", "Stack Canary", "SafeSEH", "CFI"],
    answer: 2,
    explanation: "Stack Canary(또는 Cookie)는 버퍼와 리턴 주소 사이에 배치되어, 버퍼 오버플로우 발생 시 이 값이 변조되었는지 확인하여 공격을 탐지합니다."
  },
  {
    id: 38,
    category: "Assembly",
    question: "NOP (No Operation) 썰매(Sled) 기법은 주로 언제 사용되는가?",
    options: [
      "ROP 체인을 구성할 때",
      "쉘코드의 정확한 시작 주소를 알기 어려울 때 확률을 높이기 위해",
      "함수의 리턴 값을 0으로 만들 때",
      "스택을 초기화할 때",
      "DEP를 우회할 때"
    ],
    answer: 1,
    explanation: "쉘코드를 주입했지만 정확한 시작 주소로 점프하기 어려울 때, 쉘코드 앞에 NOP(0x90)을 다수 배치하여 NOP 구간 어디에 떨어져도 쉘코드로 미끄러져(Slide) 실행되게 합니다."
  },
  {
    id: 39,
    category: "Assembly",
    question: "명령어 `inc eax`의 기능은?",
    options: [
      "EAX 값을 1 감소시킨다.",
      "EAX 값을 0으로 만든다.",
      "EAX 값을 1 증가시킨다.",
      "EAX 값을 스택에 넣는다.",
      "EAX 값을 메모리에 저장한다."
    ],
    answer: 2,
    explanation: "INC(Increment) 명령어는 피연산자의 값을 1 증가시킵니다."
  },
  {
    id: 40,
    category: "Architecture",
    question: "CISC(Complex Instruction Set Computer) 아키텍처인 x86의 특징으로 옳은 것은?",
    options: [
      "명령어의 길이가 고정적이다.",
      "명령어의 길이가 가변적이다.",
      "가젯을 찾기가 ARM보다 어렵다.",
      "레지스터의 개수가 매우 많다.",
      "모든 명령어가 1클럭에 실행된다."
    ],
    answer: 1,
    explanation: "x86은 CISC 구조로 명령어의 길이가 1바이트에서 15바이트 이상까지 가변적이며, 이로 인해 Unintended Instruction을 이용한 ROP 가젯 찾기가 용이합니다."
  },
  {
    id: 41,
    category: "ROP",
    question: "ROP 가젯을 찾을 때, 컴파일러가 의도적으로 생성한 코드가 아닌, 명령어 중간을 해석하여 발견한 가젯을 무엇이라 하는가?",
    options: ["Intended Gadget", "Unintended Gadget", "Syscall Gadget", "Shadow Gadget", "Hidden Gadget"],
    answer: 1,
    explanation: "Unintended Gadget은 명령어 바이트 스트림의 중간 오프셋부터 디스어셈블하여 발견되는, 원래 의도치 않았던 유효한 명령어 시퀀스를 말합니다."
  },
  {
    id: 42,
    category: "Assembly",
    question: "다음 중 스택 프레임을 정리하고 함수에서 복귀하는 명령어인 `ret`은 내부적으로 어떤 동작을 수행하는가?",
    options: ["pop eip", "pop esp", "pop ebp", "mov eip, esp", "push eip"],
    answer: 0,
    explanation: "`ret` 명령어는 스택(ESP)에 있는 값을 꺼내어 프로그램 카운터(EIP)에 넣는 동작(`pop eip`)과 유사합니다. (실제로는 EIP를 직접 pop하는 명령어는 없지만 개념적으로 동일)"
  },
  {
    id: 43,
    category: "Buffer Overflow",
    question: "리눅스 환경에서 바이너리의 보호 기법을 확인하기 위해 사용하는 도구는?",
    options: ["checksec", "ropgadget", "gdb", "objdump", "gcc"],
    answer: 0,
    explanation: "`checksec` 스크립트는 바이너리에 적용된 RELRO, Canary, NX, PIE 등의 보호 기법을 확인해줍니다."
  },
  {
    id: 44,
    category: "Assembly",
    question: "다음 중 `pop ebx` 명령어를 실행했을 때 `ebx`에 저장되는 값은?",
    options: [
      "스택의 최하단 값",
      "ESP가 가리키고 있던 스택의 최상단 값",
      "EBP가 가리키는 값",
      "EAX 레지스터의 값",
      "0"
    ],
    answer: 1,
    explanation: "POP 명령어는 현재 스택 포인터(ESP)가 가리키는 위치의 데이터를 가져와 레지스터에 저장하고 ESP를 증가시킵니다."
  },
  {
    id: 45,
    category: "Software Attacks",
    question: "코드 리유즈 공격(Code Reuse Attack)의 대표적인 예가 아닌 것은?",
    options: ["Return-to-Libc", "ROP (Return Oriented Programming)", "JOP (Jump Oriented Programming)", "Shellcode Injection", "COP (Call Oriented Programming)"],
    answer: 3,
    explanation: "Shellcode Injection은 새로운 코드를 주입하여 실행하는 것이고, 나머지(RTL, ROP, JOP 등)는 이미 메모리에 있는 코드를 재사용하는 공격입니다."
  },
  {
    id: 46,
    category: "Assembly",
    question: "`cmp eax, ebx` 명령어 실행 시 내부적으로 수행되는 연산은?",
    options: [
      "eax + ebx",
      "eax - ebx (결과는 저장하지 않고 플래그만 변경)",
      "eax * ebx",
      "eax / ebx",
      "eax와 ebx 값 교환"
    ],
    answer: 1,
    explanation: "CMP(Compare) 명령어는 두 피연산자의 뺄셈을 수행하여 0인지(ZF), 음수인지(SF) 등의 플래그만 업데이트하고 값은 변경하지 않습니다."
  },
  {
    id: 47,
    category: "Software Defense",
    question: "GOT(Global Offset Table)를 읽기 전용으로 만들어 덮어쓰기 공격을 방지하는 기법은?",
    options: ["ROP", "JOP", "RELRO", "SMEP", "SMAP"],
    answer: 2,
    explanation: "RELRO(Relocation Read-Only)는 프로그램 로드 후 GOT 영역을 읽기 전용으로 변경하여 변조를 막습니다."
  },
  {
    id: 48,
    category: "ROP",
    question: "ROP 페이로드를 구성할 때 `0x00` (Null Byte)가 포함되면 안 되는 주된 이유는?",
    options: [
      "CPU가 0x00을 실행할 수 없어서",
      "문자열 처리 함수(strcpy 등)가 0x00을 문자열의 끝으로 인식하여 복사를 중단하기 때문에",
      "스택이 0x00을 저장할 수 없어서",
      "운영체제가 0x00을 차단해서",
      "주소가 0x00으로 시작할 수 없어서"
    ],
    answer: 1,
    explanation: "대부분의 버퍼 오버플로우 취약점은 문자열 함수에서 발생하는데, 이 함수들은 Null Byte(0x00)를 문자열의 끝으로 인식하므로 페이로드가 중간에 잘릴 수 있습니다."
  },
  {
    id: 49,
    category: "ROP",
    question: "ROP에서 특정 조건을 만족할 때만 분기하도록 하는 'Conditional ROP'를 구현하기 위해 주로 조작해야 하는 것은?",
    options: ["EIP", "EFLAGS 레지스터 (Carry Flag 등)", "Segment Register", "Debug Register", "Control Register"],
    answer: 1,
    explanation: "조건부 분기(Conditional Jump)를 유도하기 위해서는 산술 연산 가젯(ADC, SBB 등)을 통해 EFLAGS(CF, ZF 등)를 의도적으로 조작해야 합니다."
  },
  {
    id: 50,
    category: "Assembly",
    question: "다음 중 `call` 명령어와 `ret` 명령어의 쌍으로 올바르게 설명한 것은?",
    options: [
      "call은 스택을 비우고, ret은 스택을 채운다.",
      "call은 리턴 주소를 push하고 점프하며, ret은 pop하여 점프한다.",
      "call은 리턴 주소를 pop하고, ret은 push한다.",
      "둘 다 점프만 수행한다.",
      "call은 함수 종료 시, ret은 함수 시작 시 사용한다."
    ],
    answer: 1,
    explanation: "CALL은 복귀 주소를 스택에 저장(PUSH)하고 함수로 이동하며, RET은 스택에서 복귀 주소를 꺼내(POP) 원래 위치로 돌아옵니다."
  }
];

export default function QuizPage9() {
  return (
    <QuizTemplate 
      title="소프트웨어 및 시스템 보안" 
      subtitle="고급 공격 기법"
      quizData={quizData} 
    />
  );
}