import QuizTemplate from './QuizTemplate';

const quizData = [
  // --- Topic 1: Set-UID (Source: 2. setuid.pdf) ---
  {
    id: 1,
    category: "Set-UID",
    question: "Set-UID 프로그램이 실행될 때, 프로세스의 권한 상태에 대한 설명으로 옳은 것은?",
    options: ["RUID와 EUID가 모두 사용자의 ID로 설정된다.", "RUID는 프로그램 소유자의 ID, EUID는 사용자의 ID로 설정된다.", "RUID는 사용자의 ID, EUID는 프로그램 소유자의 ID로 설정된다.", "RUID와 EUID가 모두 프로그램 소유자의 ID로 설정된다.", "실행 시 권한은 변경되지 않는다."],
    answer: 2,
    explanation: "Set-UID 프로그램 실행 시 RUID(Real UID)는 프로그램을 실행한 실제 사용자의 ID를 유지하지만, EUID(Effective UID)는 프로그램 소유자(주로 root)의 ID로 변경되어 특권 권한을 갖게 됩니다."
  },
  {
    id: 2,
    category: "Set-UID",
    question: "리눅스 시스템에서 `/usr/bin/passwd` 파일에 설정된 권한 `rwsr-xr-x` 중 `s`가 의미하는 것은?",
    options: ["Sticky Bit", "Set-UID Bit", "Execute Bit", "Read-Only Bit", "Hidden Bit"],
    answer: 1,
    explanation: "`s`는 Set-UID 비트를 의미하며, 일반 사용자가 이 프로그램을 실행할 때 파일 소유자(root)의 권한으로 실행되도록 합니다."
  },
  {
    id: 3,
    category: "Set-UID",
    question: "Set-UID 프로그램의 보안 취약점을 이용한 공격 중, 사용자가 제어할 수 있는 입력(User Inputs)을 통한 공격이 아닌 것은?",
    options: ["Buffer Overflow", "Format String Vulnerability", "Race Condition", "CHSH 입력 값 변조", "Environment Variables 조작"],
    answer: 4,
    explanation: "환경 변수(Environment Variables) 조작은 사용자 입력이 아닌 시스템 환경 설정을 통한 공격 표면으로 분류됩니다. (사용자가 설정 가능하지만 명시적 프로그램 입력 인자와는 구분됨)"
  },
  {
    id: 4,
    category: "Set-UID",
    question: "Set-UID 프로그램에서 'Capability Leaking'이 발생하는 원인으로 가장 적절한 것은?",
    options: ["프로그램이 종료될 때 메모리를 해제하지 않아서", "특권 권한을 포기(downgrade)하기 전에 파일 디스크립터 등을 닫지 않아서", "사용자가 너무 많은 입력 값을 주어서", "Set-UID 비트가 설정되지 않아서", "RUID와 EUID가 같아서"],
    answer: 1,
    explanation: "Capability Leaking은 프로그램이 특권 권한(root)으로 열어둔 리소스(예: 파일 디스크립터)를 권한 하향(privilege downgrade) 전에 정리하지 않아, 권한이 낮아진 후에도 해당 리소스에 접근 가능해지는 현상입니다."
  },
  {
    id: 5,
    category: "Set-UID",
    question: "C언어에서 외부 명령어를 실행할 때, `system()` 함수보다 `execve()` 함수가 보안상 더 안전한 이유는?",
    options: ["execve()는 쉘을 호출하지 않고 코드와 데이터를 분리하여 실행하기 때문이다.", "execve()는 실행 속도가 훨씬 빠르기 때문이다.", "execve()는 루트 권한을 자동으로 획득하기 때문이다.", "system() 함수는 더 이상 사용되지 않는 함수이기 때문이다.", "execve()는 환경 변수를 전혀 사용하지 않기 때문이다."],
    answer: 0,
    explanation: "`system()` 함수는 `/bin/sh`를 호출하여 명령어를 처리하므로 쉘 메타 문자를 이용한 공격에 취약하지만, `execve()`는 명령어와 인자를 명확히 분리하여 실행하므로 쉘 인젝션 공격을 방지할 수 있습니다."
  },
  {
    id: 6,
    category: "Set-UID",
    question: "Set-UID 프로그램 내에서 `system(\"ls\")`를 호출할 때 발생할 수 있는 보안 위협은?",
    options: ["PATH 환경 변수를 조작하여 악성 `ls` 프로그램을 실행시킬 수 있다.", "ls 명령어가 실행되지 않는다.", "버퍼 오버플로우가 무조건 발생한다.", "파일 시스템이 손상된다.", "RUID가 강제로 변경된다."],
    answer: 0,
    explanation: "`system(\"ls\")`는 절대 경로를 사용하지 않았으므로, 공격자가 `PATH` 환경 변수를 조작하여 자신이 만든 악성 `ls` 프로그램을 먼저 찾게 만들 수 있습니다."
  },
  {
    id: 7,
    category: "Set-UID",
    question: "Set-UID 프로그램이 동작하는 원리를 '슈퍼맨' 이야기로 비유했을 때, 올바른 연결은?",
    options: ["슈퍼맨: 일반 사용자, 파워 수트: Set-UID 프로그램", "슈퍼맨: 해커, 파워 수트: 운영체제", "슈퍼맨: Set-UID 프로그램, 파워 수트: 일반 사용자", "슈퍼맨: 루트 권한, 파워 수트: 쉘코드", "비유가 적절하지 않음"],
    answer: 0,
    explanation: "강의 자료에서는 일반적인 사람(일반 사용자)이 파워 수트(Set-UID 프로그램)를 입음으로써 일시적으로 강력한 힘(루트 권한)을 갖게 되는 것으로 비유합니다."
  },
  {
    id: 8,
    category: "Set-UID",
    question: "최소 권한의 원칙(Principle of Least Privilege)에 따라 Set-UID 프로그램을 작성할 때 올바른 방법은?",
    options: ["프로그램 시작부터 종료까지 항상 root 권한을 유지한다.", "필요한 작업을 수행할 때만 권한을 활성화하고, 그 외에는 권한을 비활성화(seteuid 등 사용)한다.", "모든 사용자가 파일을 수정할 수 있도록 권한을 777로 설정한다.", "Set-UID 비트 대신 항상 sudo를 사용하게 한다.", "Set-UID 프로그램은 절대 사용하지 않는다."],
    answer: 1,
    explanation: "최소 권한의 원칙은 프로그램이 작업을 수행하는 데 필요한 최소한의 시간 동안만 특권 권한을 유지하고, 필요 없을 때는 권한을 내려놓아야 함을 의미합니다."
  },
  {
    id: 9,
    category: "Set-UID",
    question: "쉘(Shell) 프로그램(예: `/bin/sh`, `/bin/bash`)이 Set-UID 프로그램 내에서 실행될 때, 자체적인 보안 조치로 수행하는 동작은?",
    options: ["자동으로 시스템을 종료한다.", "Set-UID 비트를 무시하고 권한을 하향(drop privilege)시킨다.", "루트 권한을 모든 사용자에게 부여한다.", "환경 변수를 초기화한다.", "실행 속도를 늦춘다."],
    answer: 1,
    explanation: "현대 쉘(특히 bash, dash)은 Set-UID 프로세스 내에서 실행됨을 감지하면(RUID != EUID), 보안을 위해 EUID를 RUID로 변경하여 특권 권한을 스스로 포기합니다."
  },
  {
    id: 10,
    category: "Set-UID",
    question: "Set-UID 프로그램 공격 표면(Attack Surface) 중 'System Inputs'에 해당하는 예시는?",
    options: ["사용자가 입력한 문자열", "환경 변수 PATH", "Race Condition을 유발하는 파일 시스템의 상태(심볼릭 링크 등)", "커맨드 라인 인자(argv)", "표준 입력(stdin)"],
    answer: 2,
    explanation: "사용자가 직접 제어하는 문자열 입력 외에, 파일 시스템의 상태나 경쟁 조건(Race Condition)과 같은 시스템적 요소도 공격 표면이 될 수 있습니다."
  },
  {
    id: 11,
    category: "Set-UID",
    question: "`chsh` 프로그램이 Set-UID로 설정되어야 하는 이유는?",
    options: ["일반 사용자가 `/etc/passwd` 또는 `/etc/shadow` 파일을 수정하여 자신의 쉘 정보를 변경해야 하기 때문이다.", "시스템 부팅 시 자동으로 실행되어야 하기 때문이다.", "네트워크 연결을 관리해야 하기 때문이다.", "관리자만 실행할 수 있어야 하기 때문이다.", "실행 속도를 높이기 위해서이다."],
    answer: 0,
    explanation: "일반 사용자는 `/etc/passwd` 파일에 쓰기 권한이 없으므로, 자신의 로그인 쉘을 변경하려면 root 권한으로 실행되는 `chsh` 프로그램의 도움이 필요합니다."
  },
  {
    id: 12,
    category: "Set-UID",
    question: "Set-UID 비트를 활성화하기 위한 명령어는?",
    options: ["chmod u+x file", "chmod 4755 file", "chmod 755 file", "chmod +t file", "chown root file"],
    answer: 1,
    explanation: "`chmod 4755`에서 앞의 `4`는 Set-UID 비트를 설정하는 것을 의미합니다. (2는 Set-GID, 1은 Sticky Bit)"
  },
  {
    id: 13,
    category: "Set-UID",
    question: "프로그램 내에서 `execve(v[0], v, 0)`를 호출할 때 마지막 인자 `0`의 의미는?",
    options: ["반환 값 무시", "환경 변수를 아무것도 전달하지 않음", "표준 입출력 닫기", "루트 권한으로 실행", "백그라운드 실행"],
    answer: 1,
    explanation: "`execve` 함수의 세 번째 인자는 환경 변수 배열입니다. `0` (NULL)을 전달하면 환경 변수를 전달하지 않아 환경 변수를 통한 공격을 차단할 수 있습니다."
  },
  {
    id: 14,
    category: "Set-UID",
    question: "Daemon 프로그램에 대한 설명으로 옳은 것은?",
    options: ["사용자와 직접 상호작용하는 프로그램이다.", "백그라운드에서 실행되며 보통 root 권한 등 특권 권한이 필요하다.", "Set-UID 비트가 반드시 꺼져 있어야 한다.", "일회성으로 실행되고 바로 종료된다.", "GUI 환경에서만 동작한다."],
    answer: 1,
    explanation: "데몬(Daemon)은 백그라운드에서 실행되며 서비스를 제공하는 프로그램으로, 시스템 리소스 접근을 위해 종종 특권 권한으로 실행됩니다."
  },
  {
    id: 15,
    category: "Set-UID",
    question: "Set-UID 프로그램에서 사용자 입력을 안전하게 처리하지 않을 때 발생할 수 있는 대표적인 취약점은?",
    options: ["Buffer Overflow", "Screen Tearing", "Deadlock", "Memory Leak", "Packet Loss"],
    answer: 0,
    explanation: "사용자 입력을 적절한 길이 검증 없이 복사할 경우 버퍼 오버플로우가 발생하여, 공격자가 루트 권한으로 임의의 코드를 실행할 수 있게 됩니다."
  },
  // --- Topic 2: Format String Bug (Source: 6.FSB.pdf & transcript) ---
  {
    id: 16,
    category: "Format String Bug",
    question: "Format String Bug(FSB)가 발생하는 근본적인 원인은?",
    options: ["버퍼의 크기를 검사하지 않아서", "사용자의 입력이 포맷 스트링 인자로 그대로 사용되어서", "스택 메모리가 실행 가능해서", "정수 오버플로우가 발생해서", "포인터를 초기화하지 않아서"],
    answer: 1,
    explanation: "`printf(user_input)`과 같이 사용자의 입력이 포맷 스트링의 위치에 그대로 들어갈 때, 사용자가 `%x`, `%n` 등을 입력하여 메모리를 읽거나 쓸 수 있게 됩니다."
  },
  {
    id: 17,
    category: "Format String Bug",
    question: "`printf` 함수에서 `%n` 포맷 지정자의 기능은?",
    options: ["해당 변수의 값을 16진수로 출력한다.", "해당 변수의 주소 값을 출력한다.", "지금까지 출력된 문자열의 개수를 해당 변수가 가리키는 주소에 저장한다.", "다음 입력을 개행 문자까지 받는다.", "아무 기능도 하지 않는다."],
    answer: 2,
    explanation: "`%n`은 출력하는 것이 아니라, 현재까지 출력된 문자의 개수를 인자로 전달된 주소(포인터)가 가리키는 메모리에 쓰는(write) 기능을 합니다. 이를 통해 메모리 변조가 가능합니다."
  },
  {
    id: 18,
    category: "Format String Bug",
    question: "가변 인자 함수(Variadic Function)에서 인자들을 접근하기 위해 사용하는 매크로가 아닌 것은?",
    options: ["va_start", "va_arg", "va_list", "va_end", "va_alloc"],
    answer: 4,
    explanation: "C언어 표준 라이브러리 `stdarg.h`는 `va_list`, `va_start`, `va_arg`, `va_end`를 제공합니다. `va_alloc`은 존재하지 않습니다."
  },
  {
    id: 19,
    category: "Format String Bug",
    question: "공격자가 FSB를 이용해 스택의 내용을 확인(Information Leak)하려 할 때 주로 사용하는 포맷 지정자는?",
    options: ["%n", "%x", "%s", "%d", "%c"],
    answer: 1,
    explanation: "`%x`를 연속적으로 사용하면(`%x%x...`) 스택에 있는 값들을 16진수 형태로 순차적으로 출력하여 메모리 내용을 유출할 수 있습니다. `%s`는 임의 주소 읽기에 사용됩니다."
  },
  {
    id: 20,
    category: "Format String Bug",
    question: "`printf` 함수가 호출될 때 인자들은 스택에 어떤 순서로 저장되는가?",
    options: ["순서대로 저장된다.", "역순(Reverse Order)으로 저장된다.", "랜덤하게 저장된다.", "힙 영역에 저장된다.", "레지스터에만 저장된다."],
    answer: 1,
    explanation: "C 호출 규약(Cdecl) 등에서 함수 인자는 오른쪽에서 왼쪽으로(역순으로) 스택에 푸시됩니다. 따라서 포맷 스트링이 가장 낮은 주소(Top of Stack 근처)에 위치하게 됩니다."
  },
  {
    id: 21,
    category: "Format String Bug",
    question: "FSB 취약점이 있는 코드 `printf(input)`을 안전하게 수정하는 방법은?",
    options: ["printf(\"%s\", input);", "sprintf(input);", "fprintf(input);", "printf(input, \"%s\");", "입력 크기를 제한한다."],
    answer: 0,
    explanation: "`printf(\"%s\", input)`와 같이 포맷 스트링을 명시적으로 지정하고 사용자 입력을 인자로 넘기면, 입력 내의 `%` 문자가 포맷 지정자로 해석되지 않고 문자 그대로 출력됩니다."
  },
  {
    id: 22,
    category: "Format String Bug",
    question: "`%s` 포맷 지정자를 악용하여 발생시킬 수 있는 공격 효과는?",
    options: ["임의 메모리 주소의 내용 읽기 및 유효하지 않은 주소 참조로 인한 프로그램 충돌(Crash)", "메모리 값 쓰기", "스택 프레임 생성", "환경 변수 삭제", "파일 생성"],
    answer: 0,
    explanation: "`%s`는 스택의 값을 주소로 해석하여 해당 주소의 문자열을 출력합니다. 이를 이용해 임의 주소 읽기가 가능하며, 잘못된 주소를 가리킬 경우 Segmentation Fault로 프로그램이 종료될 수 있습니다."
  },
  {
    id: 23,
    category: "Format String Bug",
    question: "메모리의 특정 위치에 `0x9896a9`와 같은 큰 숫자를 `%n`으로 쓰려고 할 때, 효율적인 공격 방법은?",
    options: ["엄청난 양의 문자를 실제로 출력한다.", "%hn (Half write)을 사용하여 2바이트씩 나누어 쓴다.", "%c를 반복해서 사용한다.", "%s를 사용하여 덮어쓴다.", "불가능하다."],
    answer: 1,
    explanation: "큰 숫자를 한 번에 쓰려면 그만큼의 문자를 출력해야 하므로 시간이 오래 걸리고 비효율적입니다. `%hn`을 사용하면 2바이트씩 상위/하위 바이트를 나누어 기록하여 출력량을 획기적으로 줄일 수 있습니다."
  },
  {
    id: 24,
    category: "Format String Bug",
    question: "FSB 공격에서 'Arbitrary Memory Write'를 수행하기 위해 필요한 두 가지 정보는?",
    options: ["덮어쓸 대상 주소와 쓰고 싶은 값", "함수의 리턴 타입과 인자 개수", "스택의 크기와 힙의 크기", "RUID와 EUID", "파일의 권한과 소유자"],
    answer: 0,
    explanation: "임의 메모리 쓰기를 위해서는 어디에(Target Address) 어떤 값(Value)을 쓸 것인지가 필요하며, `%n`을 통해 이를 수행합니다."
  },
  {
    id: 25,
    category: "Format String Bug",
    question: "컴파일러 방어 기법 중 FSB를 탐지하는 데 도움을 주는 옵션은?",
    options: ["-fno-stack-protector", "-z execstack", "-Wformat -Wformat-security", "-g", "-O2"],
    answer: 2,
    explanation: "GCC 등의 컴파일러에서 `-Wformat` 옵션은 포맷 스트링의 인자 불일치 등을 경고해주며, 잠재적인 FSB 취약점을 개발 단계에서 찾게 해줍니다."
  },
  {
    id: 26,
    category: "Format String Bug",
    question: "StackGuard(Canary)가 Format String Bug를 막는 데 효과적이지 않은 이유는?",
    options: ["StackGuard는 힙 영역만 보호하기 때문이다.", "FSB는 스택을 순차적으로 덮어쓰지 않고 원하는 위치(Return Address 등)를 직접 건너뛰어(Skip) 쓸 수 있기 때문이다.", "StackGuard는 윈도우 전용이기 때문이다.", "FSB는 메모리를 읽기만 하기 때문이다.", "StackGuard가 포맷 스트링을 해석하기 때문이다."],
    answer: 1,
    explanation: "버퍼 오버플로우는 스택을 순차적으로 덮어쓰므로 카나리가 변조되지만, FSB는 `%n`과 주소를 이용해 카나리를 건너뛰고 리턴 주소만 콕 집어 변조할 수 있어 우회 가능합니다."
  },
  {
    id: 27,
    category: "Format String Bug",
    question: "ASLR(Address Space Layout Randomization)이 FSB 공격을 완전히 막지 못하는 이유는?",
    options: ["ASLR은 코드 영역만 랜덤화하기 때문이다.", "ASLR은 root 권한에서는 동작하지 않기 때문이다.", "FSB로 스택의 값을 읽어(Information Leak) 메모리 주소를 알아낼 수 있기 때문이다.", "ASLR은 32비트 시스템에서만 동작하기 때문이다.", "FSB는 주소를 사용하지 않기 때문이다."],
    answer: 2,
    explanation: "ASLR로 주소가 랜덤화되어도, FSB의 `%x` 등을 이용해 스택에 저장된 포인터 값을 읽어내면 현재 메모리 레이아웃(Base Address 등)을 계산할 수 있어 우회 가능합니다."
  },
  {
    id: 28,
    category: "Format String Bug",
    question: "다음 코드에서 FSB 취약점이 존재하는 라인은? `char buf[100]; fgets(buf, 100, stdin); printf(buf);`",
    options: ["char buf[100];", "fgets(buf, 100, stdin);", "printf(buf);", "모든 라인", "없음"],
    answer: 2,
    explanation: "`printf(buf);`는 포맷 스트링 인자 없이 사용자 입력 버퍼를 직접 사용하므로 FSB 취약점이 존재합니다."
  },
  {
    id: 29,
    category: "Format String Bug",
    question: "`$$(command)` 구문(Command Substitution)을 이용하여 FSB 공격 페이로드를 작성하는 주된 이유는?",
    options: ["쉘 명령어를 실행하기 위해서", "출력할 수 없는 특수 문자(바이너리 주소 값 등)를 입력 값으로 전달하기 위해서", "코드를 난독화하기 위해서", "파일 크기를 줄이기 위해서", "컴파일 시간을 단축하기 위해서"],
    answer: 1,
    explanation: "공격 시 타겟 메모리 주소(예: `\x04\xf3\xff\xbf`)를 입력해야 하는데, 이는 키보드로 입력하기 어려운 바이너리 값이므로 `printf` 등을 이용한 커맨드 치환으로 생성하여 전달합니다."
  },
  {
    id: 30,
    category: "Format String Bug",
    question: "Format String Bug는 Buffer Overflow보다 발생 빈도는 낮지만 방어가 까다롭다고 여겨진다. 그 이유는?",
    options: ["프로그래밍 언어 자체의 결함이기 때문이다.", "프로그래머의 실수(Coding Error)로 간주되며 자동화된 도구로 완벽히 차단하기 어렵고, 기존 메모리 보호 기법을 우회하기 쉽기 때문이다.", "하드웨어적인 문제이기 때문이다.", "네트워크 패킷을 통해서만 공격 가능하기 때문이다.", "운영체제 커널에서만 발생하기 때문이다."],
    answer: 1,
    explanation: "FSB는 코딩 실수에서 비롯되며, 스택 가드 등의 보호 기법을 우회하여 임의 주소 읽기/쓰기가 가능해 공격 활용도가 높고 방어가 까다롭습니다."
  },
  // --- Topic 3: Race Condition (Source: 7. Race_Condition.pdf) ---
  {
    id: 31,
    category: "Race Condition",
    question: "Race Condition(경쟁 조건) 취약점이 발생하는 근본적인 원인은?",
    options: ["메모리 용량이 부족해서", "두 개 이상의 프로세스가 공유 자원에 동시에 접근하고 실행 순서에 따라 결과가 달라지기 때문에", "네트워크 속도가 너무 빨라서", "CPU가 하나밖에 없어서", "사용자 입력이 너무 길어서"],
    answer: 1,
    explanation: "경쟁 조건은 멀티 프로세스/스레드 환경에서 공유 자원(파일 등)에 대한 접근 순서가 보장되지 않아 의도치 않은 결과가 발생하는 현상입니다."
  },
  {
    id: 32,
    category: "Race Condition",
    question: "TOCTTOU(Time-Of-Check To Time-Of-Use) 취약점이란 무엇인가?",
    options: ["시간을 체크하는 함수가 고장 나는 것", "자원을 검사하는 시점(Check)과 실제로 사용하는 시점(Use) 사이에 차이가 있어 발생하는 취약점", "프로그램 실행 시간이 너무 오래 걸리는 것", "사용자가 로그인하는 시간을 제한하는 것", "타임스탬프를 위조하는 공격"],
    answer: 1,
    explanation: "TOCTTOU는 `access()`로 권한을 검사한 후 `open()`으로 파일을 열기까지의 짧은 틈(Window)을 공격자가 이용하여 자원(파일)을 바꿔치기하는 공격입니다."
  },
  {
    id: 33,
    category: "Race Condition",
    question: "Set-UID 프로그램에서 파일 접근 권한을 검사하기 위해 `access()` 함수를 사용하는 것이 보안상 취약한 이유는?",
    options: ["`access()` 함수 자체가 버그가 많아서", "`access()`는 RUID를 검사하고, 이후 `open()`은 EUID를 사용하는데 그 사이에 파일이 심볼릭 링크로 교체될 수 있어서", "`access()`는 파일을 읽기 전용으로만 열 수 있어서", "`access()`는 root 권한으로만 실행되어서", "`access()` 함수는 이제 사용되지 않아서"],
    answer: 1,
    explanation: "`access()`는 실제 사용자(RUID) 권한을 체크하지만, 그 직후 공격자가 파일을 `/etc/passwd` 등으로 향하는 심볼릭 링크로 바꾸면 `open()`은 특권(EUID)으로 해당 파일을 열게 됩니다."
  },
  {
    id: 34,
    category: "Race Condition",
    question: "Race Condition 공격에서 공격자가 주로 활용하는 파일 시스템 기능은?",
    options: ["하드 링크 (Hard Link)", "심볼릭 링크 (Symbolic Link)", "숨김 파일", "압축 파일", "읽기 전용 파일"],
    answer: 1,
    explanation: "공격자는 취약한 프로그램이 접근하려는 파일 이름(예: `/tmp/X`)을 공격 대상 파일(예: `/etc/passwd`)을 가리키는 심볼릭 링크로 바꿔치기하여 공격합니다."
  },
  {
    id: 35,
    category: "Race Condition",
    question: "Race Condition 공격을 성공시키기 위해 공격자가 공격 프로세스와 취약한 프로세스를 동시에 실행시키는 이유는?",
    options: ["CPU를 과열시키기 위해", "두 프로세스 간의 실행 순서를 뒤섞어(Interleaving) TOCTTOU 윈도우 내에서 파일 바꿔치기를 성공시키기 위해", "메모리를 고갈시키기 위해", "네트워크 대역폭을 점유하기 위해", "관리자의 눈을 피하기 위해"],
    answer: 1,
    explanation: "운영체제의 스케줄링에 의해 프로세스들의 명령어가 번갈아 실행되는 상황에서, 검사(Check)와 사용(Use) 사이의 찰나의 순간에 공격 코드가 실행되기를 기대하며 반복 실행합니다."
  },
  {
    id: 36,
    category: "Race Condition",
    question: "TOCTTOU 취약점을 방지하기 위한 방법 중 'Atomic Operation(원자적 연산)'을 사용하는 방법은?",
    options: ["`access()`와 `open()` 사이에 `sleep()`을 넣는다.", "`open()` 함수 호출 시 `O_CREAT | O_EXCL` 플래그를 사용하여 파일 생성과 존재 확인을 한 번에 수행한다.", "파일 이름을 랜덤하게 만든다.", "프로그램을 싱글 스레드로만 실행한다.", "파일 권한을 777로 만든다."],
    answer: 1,
    explanation: "`O_CREAT | O_EXCL`을 함께 사용하면 파일이 이미 존재할 경우 `open`이 실패하도록 원자적으로(Atomic) 처리되므로, 검사와 생성이 분리되지 않아 안전합니다."
  },
  {
    id: 37,
    category: "Race Condition",
    question: "Ubuntu 등의 리눅스 시스템에서 제공하는 'Sticky Symlink Protection' 기능의 역할은?",
    options: ["심볼릭 링크 생성을 완전히 금지한다.", "Sticky Bit가 설정된 디렉토리(예: `/tmp`)에서 소유자가 아닌 심볼릭 링크를 따라가지 못하게 막는다.", "심볼릭 링크의 이름을 암호화한다.", "root 사용자만 심볼릭 링크를 만들 수 있게 한다.", "심볼릭 링크를 자동으로 삭제한다."],
    answer: 1,
    explanation: "커널 레벨의 보호 기법으로, `/tmp`와 같은 공용 디렉토리에서 공격자가 생성한 심볼릭 링크를 희생자(또는 root) 프로세스가 따라가서 의도치 않은 파일에 접근하는 것을 방지합니다."
  },
  {
    id: 38,
    category: "Race Condition",
    question: "디렉토리에 설정된 Sticky Bit(`t`)의 기능은?",
    options: ["해당 디렉토리를 읽기 전용으로 만든다.", "해당 디렉토리 내의 파일은 파일 소유자나 디렉토리 소유자만 삭제/이름 변경이 가능하다.", "해당 디렉토리를 숨김 처리한다.", "해당 디렉토리 내의 파일 실행을 금지한다.", "네트워크 공유를 차단한다."],
    answer: 1,
    explanation: "Sticky Bit는 주로 `/tmp` 디렉토리에 설정되며, 누구나 파일을 쓸 수 있지만, 자신이 만들지 않은 파일은 삭제하지 못하게 하여 보안성을 높입니다."
  },
  {
    id: 39,
    category: "Race Condition",
    question: "Race Condition을 완화하기 위한 방법 중 'Repeating Check and Use'의 원리는?",
    options: ["파일을 여러 번 열어서 내용을 비교한다.", "Check와 Use 과정을 여러 번 반복하여 공격자가 모든 타이밍을 맞출 확률을 낮춘다.", "파일 이름을 계속 변경한다.", "프로그램을 여러 번 재시작한다.", "백신 프로그램을 여러 번 돌린다."],
    answer: 1,
    explanation: "파일을 열고 닫는 과정을 여러 번 반복하면서 매번 파일의 inode 등이 일치하는지 확인하면, 공격자가 그 모든 순간에 정확히 심볼릭 링크를 조작해야 하므로 성공 확률이 급격히 낮아집니다."
  },
  {
    id: 40,
    category: "Race Condition",
    question: "Race Condition 공격의 주요 타겟이 되는 디렉토리는 주로 어디인가?",
    options: ["/root", "/etc", "/tmp", "/bin", "/usr"],
    answer: 2,
    explanation: "`/tmp` 디렉토리는 모든 사용자에게 쓰기 권한(World-writable)이 있어 공격자가 심볼릭 링크를 생성하기 쉬운 장소이므로 주된 공격 무대가 됩니다."
  },
  {
    id: 41,
    category: "Race Condition",
    question: "공격자가 `/tmp/X`라는 파일을 통해 `/etc/passwd`를 덮어쓰려고 할 때, `/etc/passwd`를 타겟팅하는 가장 큰 이유는?",
    options: ["시스템의 비밀번호 파일을 조작하여 새로운 root 계정을 추가하거나 비밀번호를 없애기 위해", "파일 크기가 작아서", "텍스트 파일이라서 읽기 쉬워서", "백업이 없어서", "가장 삭제하기 쉬워서"],
    answer: 0,
    explanation: "`/etc/passwd`에는 사용자 계정 정보가 담겨있으므로, 여기에 uid가 0인(root 권한) 계정을 추가하면 시스템 장악이 가능하기 때문입니다."
  },
  {
    id: 42,
    category: "Race Condition",
    question: "최소 권한의 원칙을 적용하여 Race Condition 피해를 줄이는 방법은?",
    options: ["`open()` 호출 직전에 `seteuid(getuid())`를 호출하여 일시적으로 root 권한을 해제한다.", "항상 root 권한으로 파일을 연다.", "파일 권한을 모두에게 공개한다.", "Set-UID 비트를 삭제한다.", "파일 이름을 비밀로 한다."],
    answer: 0,
    explanation: "파일을 열 때(Use 시점) 잠시 권한을 일반 사용자로 낮추면, 설령 공격자가 심볼릭 링크로 `/etc/passwd`를 가리켜도 쓰기 권한이 없어 열리지 않게 됩니다."
  },
  {
    id: 43,
    category: "Race Condition",
    question: "프로세스 간 문맥 교환(Context Switch)은 Race Condition 공격에서 어떤 역할을 하는가?",
    options: ["공격을 방지한다.", "공격자가 개입할 수 있는 시간적 틈(Window)을 제공한다.", "프로그램 실행 속도를 높여 공격을 어렵게 한다.", "파일 시스템을 잠근다.", "메모리를 초기화한다."],
    answer: 1,
    explanation: "취약한 프로세스가 `access()` 후 문맥 교환이 일어나 잠시 멈춘 사이, 공격자 프로세스가 실행되어 심볼릭 링크를 변경할 기회를 얻게 됩니다."
  },
  {
    id: 44,
    category: "Race Condition",
    question: "리눅스 커널 파라미터 `fs.protected_symlinks`를 `0`으로 설정했을 때의 의미는?",
    options: ["심볼릭 링크 보호 기능이 활성화된다.", "심볼릭 링크 보호 기능이 비활성화되어 공격 실습이 가능하다.", "심볼릭 링크 생성이 금지된다.", "모든 심볼릭 링크가 삭제된다.", "파일 시스템이 읽기 전용이 된다."],
    answer: 1,
    explanation: "보안 실습 등을 위해 보호 기법을 끌 때 0으로 설정합니다. 1로 설정하면 보호 기법이 켜져 공격이 어려워집니다."
  },
  {
    id: 45,
    category: "Race Condition",
    question: "다음 코드 조각에서 Race Condition 취약점이 존재하는 이유는? `if(!access(file, W_OK)) { f = open(file, ...); }`",
    options: ["`access` 함수의 인자가 잘못되어서", "`access` 검사 후 `open` 실행 사이에 파일이 변경될 수 있어서", "`open` 함수가 파일을 생성하지 않아서", "`W_OK` 플래그가 잘못되어서", "세미콜론이 빠져서"],
    answer: 1,
    explanation: "전형적인 TOCTTOU 패턴으로, 검사 시점과 사용 시점이 분리되어 있어 그 사이에 공격이 가능합니다."
  },
  // --- General / Mixed (Based on all files) ---
  {
    id: 46,
    category: "General Security",
    question: "Set-UID, Race Condition, FSB 등에서 공통적으로 언급되는 중요한 보안 원칙으로, '코드와 데이터의 분리'가 지켜지지 않아 발생하는 문제는?",
    options: ["Race Condition", "Format String Bug & Buffer Overflow", "DDoS", "Phishing", "Sniffing"],
    answer: 1,
    explanation: "FSB와 버퍼 오버플로우는 사용자 입력(데이터)이 프로그램 제어(코드/포맷)에 영향을 미치거나 코드로 실행되어 발생하는 문제입니다."
  },
  {
    id: 47,
    category: "General Security",
    question: "공격자가 메모리 보호 기법(NX bit 등)을 우회하기 위해 사용하는, '이미 존재하는 코드(라이브러리 함수 등)'를 호출하는 공격 기법은?",
    options: ["Brute Force", "Return-to-Libc", "SQL Injection", "XSS", "Sniffing"],
    answer: 1,
    explanation: "스택에서 코드를 실행할 수 없을 때(Non-Executable Stack), 공격자는 라이브러리에 이미 로드된 `system()` 등의 함수 주소로 리턴 주소를 변조하는 RTL(Return-to-Libc) 공격을 사용합니다."
  },
  {
    id: 48,
    category: "General Security",
    question: "보안 취약점 중 '프로그래밍 버그'보다는 '타이밍 문제'에 가까운 것은?",
    options: ["Buffer Overflow", "Format String Bug", "Race Condition", "Integer Overflow", "Null Pointer Dereference"],
    answer: 2,
    explanation: "Race Condition은 코드 자체의 논리적 오류보다는 실행 타이밍과 순서에 의존적인 문제입니다."
  },
  {
    id: 49,
    category: "General Security",
    question: "다음 중 소프트웨어 보안 취약점을 완화하기 위한 운영체제 차원의 방어 기법이 아닌 것은?",
    options: ["ASLR", "DEP / NX", "Stack Canary", "Sticky Symlink Protection", "Code Obfuscation"],
    answer: 4,
    explanation: "ASLR, NX, Canary, Symlink Protection 등은 OS나 컴파일러가 제공하는 방어 기법이지만, 코드 난독화(Code Obfuscation)는 개발자가 소스 코드를 보호하기 위해 적용하는 기법입니다."
  },
  {
    id: 50,
    category: "General Security",
    question: "임의의 메모리 주소에 원하는 값을 덮어쓸 수 있는 취약점(Arbitrary Memory Write)을 이용하여 공격자가 최종적으로 달성하고자 하는 일반적인 목표는?",
    options: ["변수 값 초기화", "프로그램 실행 속도 향상", "Return Address 등을 변조하여 쉘코드 실행(Control Flow Hijacking)", "디스크 용량 확보", "화면 해상도 변경"],
    answer: 2,
    explanation: "메모리 쓰기 취약점을 통해 공격자는 리턴 주소나 GOT 등을 덮어써서 프로그램의 실행 흐름을 자신이 원하는 악성 코드(쉘코드)로 돌려 시스템 제어권을 탈취(Shell 획득)하려 합니다."
  }
];

export default function QuizPage10() {
  return (
    <QuizTemplate 
      title="소프트웨어 및 시스템 보안" 
      subtitle="어플리케이션 취약점"
      quizData={quizData} 
    />
  );
}