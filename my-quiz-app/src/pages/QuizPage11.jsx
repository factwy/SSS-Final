import QuizTemplate from './QuizTemplate';

const quizData = [
    { id: 1, category: "Set-UID", question: "Set-UID 프로그램에서 프로세스의 권한을 결정하는 데 사용되는 UID는?", options: ["Real UID (RUID)", "Effective UID (EUID)", "Saved UID (SUID)", "File UID (FUID)", "Group UID (GUID)"], answer: 1, explanation: "Effective UID (EUID)는 프로세스의 권한을 결정합니다. Set-UID 프로그램이 실행되면 EUID는 프로그램 소유자의 ID로 설정되어 해당 권한으로 실행됩니다." },
    
    { id: 2, category: "Buffer Overflow", question: "스택 버퍼 오버플로우를 감지하기 위해 스택의 반환 주소 앞에 삽입하는 특수한 값은?", options: ["Stack Canary", "ASLR", "DEP", "RELRO", "NX Bit"], answer: 0, explanation: "Stack Canary(카나리)는 버퍼와 반환 주소 사이에 삽입되는 랜덤 값으로, 버퍼 오버플로우 발생 시 이 값이 변조되면 공격을 감지할 수 있습니다." },
    
    { id: 3, category: "Format String", question: "printf() 함수에서 메모리에 값을 쓸 수 있게 해주는 포맷 지정자는?", options: ["%x", "%s", "%d", "%n", "%p"], answer: 3, explanation: "%n은 지금까지 출력된 문자의 개수를 지정된 메모리 주소에 쓰는 포맷 지정자로, 포맷 스트링 공격에 악용될 수 있습니다." },
    
    { id: 4, category: "Race Condition", question: "파일 접근 권한을 확인하는 시점과 실제로 파일을 사용하는 시점 사이의 취약점을 이용하는 공격 유형은?", options: ["Buffer Overflow", "SQL Injection", "TOCTTOU", "XSS", "CSRF"], answer: 2, explanation: "TOCTTOU(Time-Of-Check To Time-Of-Use)는 검사 시점과 사용 시점 사이의 시간 차이를 악용하는 레이스 컨디션 공격입니다." },
    
    { id: 5, category: "Defense", question: "프로그램 실행 시마다 스택, 힙, 라이브러리의 메모리 주소를 무작위로 변경하는 보안 기법은?", options: ["DEP", "ASLR", "Stack Canary", "RELRO", "CFI"], answer: 1, explanation: "ASLR(Address Space Layout Randomization)은 메모리 주소를 무작위화하여 공격자가 특정 주소를 예측하기 어렵게 만드는 방어 기법입니다." },
    
    { id: 6, category: "ROP", question: "DEP/NX 보호를 우회하기 위해 기존 코드 조각(gadget)을 체이닝하여 공격하는 기법은?", options: ["Buffer Overflow", "Format String Attack", "Return Oriented Programming", "SQL Injection", "Heap Spray"], answer: 2, explanation: "ROP(Return Oriented Programming)는 메모리에 이미 존재하는 코드 조각(gadget)들을 연결하여 원하는 동작을 수행하게 하는 공격 기법입니다." },
    
    { id: 7, category: "Shellcode", question: "쉘코드에서 시스템 콜을 호출할 때 x86 리눅스에서 사용하는 인터럽트 번호는?", options: ["INT 0x21", "INT 0x80", "INT 0x13", "INT 0x10", "INT 0x40"], answer: 1, explanation: "x86 리눅스에서 시스템 콜은 INT 0x80 인터럽트를 통해 호출됩니다. 이를 통해 커널 모드로 전환되어 시스템 콜이 실행됩니다." },
    
    { id: 8, category: "Defense", question: "쓰기 가능한 메모리 영역에서 코드 실행을 금지하는 보안 기법은?", options: ["ASLR", "Stack Canary", "DEP/NX", "RELRO", "PIE"], answer: 2, explanation: "DEP(Data Execution Prevention) 또는 NX(No-eXecute)는 스택이나 힙과 같은 쓰기 가능한 영역에서 코드 실행을 금지하여 코드 인젝션 공격을 방지합니다." },
    
    { id: 9, category: "Set-UID", question: "Set-UID 프로그램 실행 시 Real UID와 Effective UID의 관계는?", options: ["RUID = EUID", "RUID ≠ EUID", "RUID > EUID", "RUID < EUID", "RUID와 EUID는 관계없음"], answer: 1, explanation: "Set-UID 프로그램 실행 시 RUID는 실행한 사용자의 ID로 유지되고, EUID는 프로그램 소유자의 ID로 설정되어 서로 다릅니다." },
    
    { id: 10, category: "Format String", question: "포맷 스트링 공격에서 스택 포인터를 이동시키며 스택의 값을 16진수로 출력하는 포맷 지정자는?", options: ["%d", "%s", "%x", "%n", "%c"], answer: 2, explanation: "%x는 스택에서 4바이트 값을 읽어 16진수로 출력하며, 여러 번 사용하면 스택 포인터가 이동하면서 스택의 내용을 유출할 수 있습니다." },
    
    { id: 11, category: "TEE", question: "ARM 프로세서에서 일반 실행 환경과 분리된 보안 실행 환경을 제공하는 기술은?", options: ["Intel SGX", "AMD SEV", "ARM TrustZone", "Intel TXT", "AMD PSP"], answer: 2, explanation: "ARM TrustZone은 Normal World와 Secure World를 하드웨어적으로 분리하여 민감한 데이터와 코드를 보호하는 TEE(Trusted Execution Environment) 기술입니다." },
    
    { id: 12, category: "Cache Attack", question: "CPU의 비순차 실행(out-of-order execution)을 악용하여 커널 메모리를 읽는 공격은?", options: ["Spectre", "Meltdown", "Rowhammer", "RIDL", "ZombieLoad"], answer: 1, explanation: "Meltdown은 CPU의 비순차 실행을 악용하여 권한이 없는 사용자가 커널 메모리를 읽을 수 있게 하는 하드웨어 취약점입니다." },
    
    { id: 13, category: "Cache Attack", question: "CPU의 분기 예측(branch prediction)을 악용하는 부채널 공격은?", options: ["Meltdown", "Spectre", "Rowhammer", "Prime+Probe", "Flush+Reload"], answer: 1, explanation: "Spectre는 CPU의 투기적 실행(speculative execution)과 분기 예측을 악용하여 다른 프로세스의 메모리를 읽을 수 있는 공격입니다." },
    
    { id: 14, category: "ROP", question: "ROP 공격에서 사용되는 'gadget'의 특징으로 올바른 것은?", options: ["새로 주입된 악성 코드", "ret 명령어로 끝나는 기존 코드 조각", "암호화된 쉘코드", "힙에 저장된 데이터", "스택 카나리 값"], answer: 1, explanation: "ROP gadget은 메모리에 이미 존재하는 코드 조각으로, 일반적으로 ret 명령어로 끝나서 다음 gadget으로 제어를 넘길 수 있습니다." },
    
    { id: 15, category: "Defense", question: "GOT(Global Offset Table) 영역을 읽기 전용으로 설정하여 GOT overwrite 공격을 방지하는 기법은?", options: ["ASLR", "DEP", "Stack Canary", "RELRO", "CFI"], answer: 3, explanation: "RELRO(Relocation Read-Only)는 GOT와 같은 중요 영역을 읽기 전용으로 설정하여 공격자가 함수 주소를 변조하는 것을 방지합니다." },
    
    { id: 16, category: "Shellcode", question: "쉘코드에서 /bin/sh를 실행하기 위해 주로 사용하는 시스템 콜은?", options: ["fork()", "execve()", "write()", "read()", "open()"], answer: 1, explanation: "execve()는 현재 프로세스를 새로운 프로그램으로 대체하는 시스템 콜로, 쉘코드에서 /bin/sh를 실행하여 셸을 획득하는 데 사용됩니다." },
    
    { id: 17, category: "Buffer Overflow", question: "버퍼 오버플로우 공격에서 셸코드 주소를 정확히 맞추기 위해 사용하는 연속된 NOP 명령어들을 무엇이라고 하는가?", options: ["NOP Chain", "NOP Sled", "NOP Array", "NOP Padding", "NOP Buffer"], answer: 1, explanation: "NOP Sled는 연속된 NOP(No Operation) 명령어들로, 셸코드 앞에 배치하여 점프 주소가 정확하지 않아도 셸코드에 도달할 수 있게 합니다." },
    
    { id: 18, category: "TEE", question: "ARM TrustZone에서 Normal World에서 Secure World로 전환하기 위해 사용하는 명령어는?", options: ["INT 0x80", "SYSCALL", "SMC", "SVC", "HVC"], answer: 2, explanation: "SMC(Secure Monitor Call)는 ARM TrustZone에서 Normal World에서 Secure World로 전환하기 위해 사용하는 특수 명령어입니다." },
    
    { id: 19, category: "Race Condition", question: "Race Condition 공격을 방어하기 위한 원칙으로, 프로그램이 필요한 최소한의 권한만 사용해야 한다는 원칙은?", options: ["Defense in Depth", "Principle of Least Privilege", "Separation of Duties", "Complete Mediation", "Fail-Safe Defaults"], answer: 1, explanation: "최소 권한의 원칙(Principle of Least Privilege)은 프로그램이 작업에 필요한 최소한의 권한만 사용하여 취약점 악용의 영향을 최소화합니다." },
    
    { id: 20, category: "Format String", question: "포맷 스트링 공격에서 2바이트 단위로 메모리에 값을 쓸 때 사용하는 포맷 지정자는?", options: ["%n", "%hn", "%hhn", "%ln", "%lln"], answer: 1, explanation: "%hn은 half word(2바이트) 단위로 메모리에 값을 쓰는 포맷 지정자로, %n(4바이트)보다 더 효율적인 공격이 가능합니다." },
    
    { id: 21, category: "ROP", question: "Return-to-libc 공격에서 주로 악용되는 라이브러리 함수는?", options: ["printf()", "scanf()", "system()", "malloc()", "strcpy()"], answer: 2, explanation: "system() 함수는 인자로 전달된 명령어를 셸에서 실행하므로, Return-to-libc 공격에서 '/bin/sh'를 인자로 전달하여 셸을 획득하는 데 악용됩니다." },
    
    { id: 22, category: "TEE", question: "삼성 모바일 기기에서 TrustZone 기반의 보안 플랫폼으로 사용되는 것은?", options: ["QSEE", "Trusty", "OP-TEE", "Samsung KNOX", "Trustonic"], answer: 3, explanation: "Samsung KNOX는 삼성의 TrustZone 기반 보안 플랫폼으로, 민감한 데이터 보호와 보안 서비스를 제공합니다." },
    
    { id: 23, category: "Defense", question: "Meltdown 공격을 방어하기 위해 커널 메모리를 사용자 공간에서 분리하는 기법은?", options: ["ASLR", "KASLR", "KPTI", "SMEP", "SMAP"], answer: 2, explanation: "KPTI(Kernel Page Table Isolation)는 커널 페이지 테이블을 사용자 공간에서 분리하여 Meltdown 공격을 방어합니다." },
    
    { id: 24, category: "Shellcode", question: "쉘코드 작성 시 문자열 중간에 NULL 바이트(0x00)가 있으면 문제가 되는 이유는?", options: ["컴파일 에러 발생", "실행 속도 저하", "문자열 함수가 NULL에서 종료", "메모리 누수 발생", "권한 상승 실패"], answer: 2, explanation: "strcpy() 등의 문자열 함수는 NULL 바이트를 문자열의 끝으로 인식하여 복사를 중단하므로, 쉘코드에 NULL이 있으면 전체가 복사되지 않습니다." },
    
    { id: 25, category: "Set-UID", question: "다음 중 Set-UID 프로그램의 대표적인 예시는?", options: ["/bin/ls", "/bin/cat", "/usr/bin/passwd", "/bin/echo", "/bin/grep"], answer: 2, explanation: "/usr/bin/passwd는 일반 사용자가 자신의 비밀번호를 변경할 수 있도록 root 권한으로 실행되는 대표적인 Set-UID 프로그램입니다." }
  ];

export default function QuizPage11() {
  return (
    <QuizTemplate 
      title="소시보 기말 대비"
      subtitle="문제지 1"
      quizData={quizData}
    />
  );
}