import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle, XCircle, AlertCircle, RefreshCw, Award, ChevronRight, ChevronLeft } from 'lucide-react';
import QuizTemplate from './QuizTemplate'; // 위에서 만든 파일 경로

const quizData = [
  {
    id: 1,
    category: "OS Kernel Security & Defenses",
    question: "운영체제 커널(Kernel)의 역할과 권한에 대한 설명으로 가장 적절하지 않은 것은?",
    options: [
      "a) 커널은 프로세스 관리, 메모리 관리, 파일 시스템 관리 등의 핵심 기능을 수행한다.",
      "b) x86 아키텍처에서 커널은 Ring 3 권한으로 실행되어 시스템 안정성을 보장한다.",
      "c) 유저 어플리케이션이 하드웨어 리소스를 필요로 할 때 시스템 콜(System Call)을 통해 커널에 요청한다.",
      "d) 커널 모드에서는 모든 메모리 영역과 CPU 명령에 접근할 수 있는 권한을 가진다.",
      "e) 디바이스 드라이버는 일반적으로 커널 권한으로 실행되어 하드웨어를 제어한다."
    ],
    answer: 1,
    explanation: "x86 아키텍처에서 커널은 가장 높은 권한인 Ring 0에서 실행되며, 유저 어플리케이션이 Ring 3에서 실행됩니다. Ring 0는 모든 하드웨어 제어 권한을 가집니다."
  },
  {
    id: 2,
    category: "OS Kernel Security & Defenses",
    question: "다음 중 가상 메모리(Virtual Memory) 주소를 물리 메모리(Physical Address) 주소로 변환하는 메커니즘에 대한 설명으로 옳은 것은?",
    options: [
      "a) 모든 프로세스는 동일한 페이지 테이블(Page Table)을 공유하여 메모리를 절약한다.",
      "b) 가상 주소의 상위 비트는 페이지 디렉토리와 페이지 테이블의 인덱스로 사용된다.",
      "c) CR3 레지스터(x86)나 TTBR 레지스터(ARM)는 현재 실행 중인 스레드의 스택 포인터를 저장한다.",
      "d) 페이지 테이블 엔트리(PTE)에는 오직 물리 주소 정보만 저장되며 권한 비트는 저장되지 않는다.",
      "e) TLB(Translation Lookaside Buffer)는 메모리 변환 속도를 늦추는 주된 원인이다."
    ],
    answer: 1,
    explanation: "가상 주소는 페이지 디렉토리 인덱스, 페이지 테이블 인덱스, 오프셋으로 나뉘어 변환에 사용됩니다."
  },
  {
    id: 3,
    category: "OS Kernel Security & Defenses",
    question: "시스템 콜(System Call) 처리 과정에서 공격자가 sys_call_table을 변조했을 때 발생할 수 있는 현상은?",
    options: [
      "a) 시스템 콜 호출 시 CPU가 즉시 리셋된다.",
      "b) 유저 모드에서 커널 모드로의 전환이 차단된다.",
      "c) 정상적인 커널 함수 대신 공격자가 의도한 악성 함수가 실행된다.",
      "d) 페이지 폴트(Page Fault)가 발생하여 해당 프로세스만 종료된다.",
      "e) 커널의 ASLR이 즉시 비활성화된다."
    ],
    answer: 2,
    explanation: "시스템 콜 테이블의 함수 포인터를 악성 함수의 주소로 덮어쓰면(Hooking), 해당 시스템 콜 호출 시 악성 함수가 실행됩니다."
  },
  {
    id: 4,
    category: "OS Kernel Security & Defenses",
    question: "리눅스 커널 모듈(LKM) 기반의 루트킷(Rootkit)이 자신의 존재를 숨기기 위해 사용하는 기법으로 가장 대표적인 것은?",
    options: [
      "a) /proc/modules 파일의 권한을 읽기 전용으로 변경한다.",
      "b) 커널 모듈을 관리하는 연결 리스트(Linked List)에서 자신의 모듈 구조체를 제거한다.",
      "c) 커널 메모리 전체를 암호화하여 분석을 불가능하게 한다.",
      "d) 시스템 콜 테이블을 삭제하여 아무런 모듈도 로드되지 않게 한다.",
      "e) 모든 유저 프로세스를 종료시켜 감시를 피한다."
    ],
    answer: 1,
    explanation: "리눅스 커널 모듈들은 이중 연결 리스트로 관리됩니다. 루트킷은 list_del 등을 이용해 이 리스트에서 자신의 노드를 제거함으로써 lsmod 등의 명령어로 조회되지 않게 숨깁니다."
  },
  {
    id: 5,
    category: "OS Kernel Security & Defenses",
    question: "ARMv8-A 아키텍처의 Exception Level(EL)에 대한 설명으로 올바른 것은?",
    options: [
      "a) EL0는 가장 높은 권한을 가지며 하이퍼바이저가 실행된다.",
      "b) EL1은 주로 OS 커널이 실행되는 권한 레벨이다.",
      "c) EL2는 유저 어플리케이션이 실행되는 레벨이다.",
      "d) EL3는 32비트 호환성을 위해서만 존재하며 보안 기능과는 무관하다.",
      "e) 모든 시스템은 반드시 EL0부터 EL3까지 4개의 레벨을 모두 구현해야 한다."
    ],
    answer: 1,
    explanation: "ARMv8에서 EL0는 유저 앱, EL1은 OS 커널, EL2는 하이퍼바이저, EL3는 시큐어 모니터가 실행됩니다."
  },
  {
    id: 6,
    category: "OS Kernel Security & Defenses",
    question: "ARM 아키텍처의 레지스터 중 함수 호출 시 복귀 주소(Return Address)를 저장하는 레지스터(Link Register)는 무엇인가?",
    options: [
      "a) X0",
      "b) PC (Program Counter)",
      "c) SP (Stack Pointer)",
      "d) X30 (LR)",
      "e) X29 (FP)"
    ],
    answer: 3,
    explanation: "ARM에서 X30 레지스터는 Link Register(LR)로, 함수 호출 후 되돌아갈 주소를 저장합니다."
  },
  {
    id: 7,
    category: "OS Kernel Security & Defenses",
    question: "TrustZone 기술이 적용된 ARM 프로세서의 'Secure World'와 'Non-secure World'에 대한 설명으로 틀린 것은?",
    options: [
      "a) Non-secure World(일반 OS)는 Secure World의 메모리에 직접 접근할 수 없다.",
      "b) Secure World는 Non-secure World의 메모리에 접근할 수 있다.",
      "c) 두 월드 간의 전환은 모니터 모드(EL3)를 통해 이루어진다.",
      "d) 물리 메모리 주소 공간은 논리적으로 분리되어 관리된다.",
      "e) Secure World는 오직 암호화폐 채굴을 위해서만 사용된다."
    ],
    answer: 4,
    explanation: "Secure World는 DRM, 결제, 생체인증 등 보안이 중요한 작업을 위해 사용되며, 암호화폐 채굴용이 아닙니다."
  },
  {
    id: 8,
    category: "OS Kernel Security & Defenses",
    question: "강의에서 시연된 안드로이드 루트킷 시나리오 중 '파밍(Pharming)' 공격의 원리는 무엇인가?",
    options: [
      "a) 스마트폰의 화면 터치 입력을 가로채서 비밀번호를 알아낸다.",
      "b) 커널 레벨에서 DNS 응답 패킷을 변조하여 사용자를 가짜 사이트로 유도한다.",
      "c) /etc/hosts 파일을 수정하여 모든 웹사이트 접속을 차단한다.",
      "d) 웹 브라우저의 캐시를 삭제하여 로그인 정보를 초기화한다.",
      "e) 키보드 드라이버를 삭제하여 입력을 불가능하게 한다."
    ],
    answer: 1,
    explanation: "강의 시연에서 루트킷은 Netfilter 등을 후킹하여 DNS 응답 패킷을 조작, 사용자가 정상 URL(예: naver.com)을 입력해도 공격자의 피싱 사이트로 접속하게 만듭니다."
  },
  {
    id: 9,
    category: "OS Kernel Security & Defenses",
    question: "VFS(Virtual File System) 후킹을 통해 특정 파일을 숨기는 공격의 원리는?",
    options: [
      "a) 하드디스크의 파일 시스템 포맷을 변경한다.",
      "b) 파일의 이름을 빈 문자열(\"\")로 변경한다.",
      "c) 해당 파일의 아이노드(inode) 객체 내 함수 포인터(예: readdir)를 조작하여 파일 리스트 반환 시 특정 파일을 제외한다.",
      "d) 파일의 권한을 000으로 변경하여 아무도 읽지 못하게 한다.",
      "e) 파일을 /tmp 디렉토리로 이동시킨다."
    ],
    answer: 2,
    explanation: "VFS 레이어에서 특정 디렉토리의 아이노드 연산(예: readdir)을 후킹하여, 파일 목록을 반환할 때 숨기고자 하는 파일만 리스트에서 제외하여 사용자에게 보여줍니다."
  },
  {
    id: 10,
    category: "OS Kernel Security & Defenses",
    question: "DEP(Data Execution Prevention) 또는 NX(No-Execute) 기법의 핵심 방어 원리는 무엇인가?",
    options: [
      "a) 프로그램의 코드 영역을 암호화하여 실행을 방지한다.",
      "b) 스택(Stack)이나 힙(Heap)과 같은 데이터 영역에 실행 권한을 제거하여 쉘코드 실행을 막는다.",
      "c) 함수 리턴 주소 앞에 특정한 값을 삽입하여 오버플로우를 탐지한다.",
      "d) 프로그램이 실행될 때마다 메모리 주소를 랜덤하게 변경한다.",
      "e) 모든 포인터 변수를 읽기 전용으로 설정한다."
    ],
    answer: 1,
    explanation: "DEP/NX는 스택이나 힙과 같은 데이터 영역에 실행 권한(Executable bit)을 끄고 읽기/쓰기 권한만 부여하여, 해당 영역에 주입된 악성 코드가 실행되는 것을 하드웨어적으로 차단합니다."
  },
  {
    id: 11,
    category: "OS Kernel Security & Defenses",
    question: "스택 카나리(Stack Canary)가 버퍼 오버플로우 공격을 탐지하는 시점은 언제인가?",
    options: [
      "a) 함수가 호출(Call)되는 즉시",
      "b) 버퍼에 데이터가 복사되는 도중 실시간으로",
      "c) 함수가 종료되어 리턴(Return)하기 직전에",
      "d) 프로그램이 컴파일되는 시점에",
      "e) 운영체제가 프로세스를 스케줄링할 때"
    ],
    answer: 2,
    explanation: "스택 카나리는 함수 프롤로그에서 스택에 저장되고, 함수 에필로그(리턴 직전)에서 값이 변조되었는지 검사하여 버퍼 오버플로우 발생 여부를 판단합니다."
  },
  {
    id: 12,
    category: "OS Kernel Security & Defenses",
    question: "다음 중 스택 카나리(Stack Canary)를 우회할 수 있는 조건이나 기법이 아닌 것은?",
    options: [
      "a) 공격자가 임의 메모리 읽기(Arbitrary Memory Read) 취약점을 통해 카나리 값을 알아낸 경우",
      "b) fork()를 사용하는 서버에서 자식 프로세스가 죽어도 카나리 값이 변하지 않아 1바이트씩 Brute Force 가능한 경우",
      "c) 포맷 스트링 버그 등을 이용해 카나리 위치를 건너뛰고 리턴 주소만 덮어쓰는 경우",
      "d) 카나리 값의 첫 바이트가 NULL(0x00)인 경우",
      "e) 공격자가 버퍼 오버플로우를 통해 카나리 값을 원본과 동일하게 덮어쓰는 경우"
    ],
    answer: 3,
    explanation: "카나리 첫 바이트 NULL은 카나리 값을 문자열 함수로 덮어쓰거나 유출하기 어렵게 만드는 '방어 설계' 요소이므로 우회 조건이 아닙니다."
  },
  {
    id: 13,
    category: "OS Kernel Security & Defenses",
    question: "ASLR(Address Space Layout Randomization)이 적용되었을 때 랜덤화되는 영역이 아닌 것은? (일반적인 설정 기준)",
    options: [
      "a) 스택(Stack)의 베이스 주소",
      "b) 힙(Heap)의 베이스 주소",
      "c) 공유 라이브러리(Library)의 로딩 주소",
      "d) PIE가 적용되지 않은 실행 파일의 코드(Text) 영역 주소",
      "e) mmap 으로 할당된 메모리 영역의 주소"
    ],
    answer: 3,
    explanation: "일반적인 ASLR(리눅스 기본 설정)은 스택, 힙, 라이브러리(mmap) 영역을 랜덤화하지만, 실행 파일 자체의 코드 영역(Main Executable)은 PIE(Position Independent Executable) 옵션으로 컴파일되지 않으면 고정된 주소에 로딩됩니다."
  },
  {
    id: 14,
    category: "OS Kernel Security & Defenses",
    question: "ASLR 환경에서 공격자가 쉘코드의 정확한 주소를 모를 때, 확률을 높이기 위해 사용하는 기법으로 \"미끄럼틀을 태운다\"라고 표현하는 기법은?",
    options: [
      "a) Heap Spraying",
      "b) NOP Sled",
      "c) ROP Chain",
      "d) Stack Pivoting",
      "e) Integer Overflow"
    ],
    answer: 1,
    explanation: "NOP Sled는 쉘코드 앞에 NOP (No Operation) 명령어를 다수 배치하여, 공격자가 주소를 정확히 맞추지 못하고 NOP 영역 어디에 떨어지더라도 실행 흐름이 쉘코드까지 미끄러져 내려오게 하는 기법입니다."
  },
  {
    id: 15,
    category: "OS Kernel Security & Defenses",
    question: "GOT(Global Offset Table)와 PLT(Procedure Linkage Table)를 이용한 공격(GOT Hijacking)이 가능한 근본적인 이유는?",
    options: [
      "a) PLT 코드가 힙 영역에 존재하기 때문이다.",
      "b) Lazy Binding을 지원하기 위해 GOT 영역이 런타임에 쓰기 권한(Write Permission)을 가지고 있기 때문이다.",
      "c) GOT 테이블의 크기가 고정되어 있지 않기 때문이다.",
      "d) ASLR이 GOT 영역에는 적용되지 않기 때문이다.",
      "e) 컴파일러가 GOT 주소를 암호화하지 않기 때문이다."
    ],
    answer: 1,
    explanation: "Lazy Binding은 함수가 처음 호출될 때 주소를 알아오기 위해 GOT 영역에 쓰기 권한을 필요로 합니다. 공격자는 이 쓰기 권한을 악용하여 GOT 엔트리를 덮어씁니다."
  },
  {
    id: 16,
    category: "OS Kernel Security & Defenses",
    question: "RELRO(Relocation Read-Only) 보호 기법 중 'Full RELRO'의 특징은 무엇인가?",
    options: [
      "a) 프로그램 시작 시 모든 심볼을 바인딩하고 GOT를 읽기 전용(Read-Only)으로 변경한다.",
      "b) GOT는 쓰기 가능하게 두고 PLT만 읽기 전용으로 설정한다.",
      "c) 스택 카나리를 힙 영역에도 적용한다.",
      "d) 프로그램 실행 속도를 높이기 위해 Lazy Binding을 강제한다.",
      "e) 32비트 시스템에서만 동작하는 메모리 보호 기법이다."
    ],
    answer: 0,
    explanation: "Full RELRO는 프로그램 로딩 시점에 모든 심볼 해석(Binding)을 완료하고, GOT 영역을 포함한 관련 섹션을 읽기 전용(Read-Only)으로 변경하여 GOT Hijacking을 원천 차단합니다."
  },
  {
    id: 17,
    category: "OS Kernel Security & Defenses",
    question: "ROP(Return Oriented Programming) 공격이 등장하게 된 주된 배경(방어 기법)은 무엇인가?",
    options: [
      "a) Stack Canary",
      "b) ASLR",
      "c) DEP (Data Execution Prevention)",
      "d) RELRO",
      "e) Code Signing"
    ],
    answer: 2,
    explanation: "DEP(NX)가 도입되어 스택/힙에서 코드 실행이 불가능해지자, 공격자들은 실행 권한이 있는 기존 코드 영역(라이브러리 등)의 조각들을 모아 실행하는 ROP 기법을 고안했습니다."
  },
  {
    id: 18,
    category: "OS Kernel Security & Defenses",
    question: "ROP 공격에서 '가젯(Gadget)'이라고 불리는 코드 조각들의 공통적인 특징은?",
    options: [
      "a) 항상 NOP 명령어로 시작한다.",
      "b) 반드시 ret (Return) 명령어로 끝난다.",
      "c) 암호화 알고리즘을 수행한다.",
      "d) 커널 모드에서만 실행된다.",
      "e) 스택 포인터를 초기화한다."
    ],
    answer: 1,
    explanation: "ROP 가젯은 기존 코드 영역에 존재하는 짧은 명령어 시퀀스로, 실행 후 제어권을 다음 가젯으로 넘기기 위해 반드시 ret 명령어로 끝나야 합니다."
  },
  {
    id: 19,
    category: "OS Kernel Security & Defenses",
    question: "KASLR(Kernel Address Space Layout Randomization)을 우회하기 위한 'DrK' 공격(또는 Double Page Fault 공격)이 악용하는 하드웨어적 특성은?",
    options: [
      "a) 멜트다운(Meltdown) 취약점",
      "b) 인텔 TSX 기능과 페이지 폴트 처리 시간의 차이(Timing Side Channel)",
      "c) 스펙터(Spectre) 분기 예측",
      "d) Rowhammer 비트 플립 현상",
      "e) 캐시 일관성(Cache Coherence) 프로토콜 오류"
    ],
    answer: 1,
    explanation: "DrK 공격은 인텔 TSX(트랜잭션 메모리) 기능을 이용해, 커널 메모리 접근 시 권한 오류(매핑됨)와 주소 오류(매핑 안 됨) 간의 미세한 페이지 폴트 처리 시간 차이(Timing Side Channel)를 측정하여 KASLR을 우회합니다."
  },
  {
    id: 20,
    category: "OS Kernel Security & Defenses",
    question: "'ret2usr' (Return-to-User) 공격에 대한 설명으로 옳은 것은?",
    options: [
      "a) 유저 권한을 획득하기 위해 커널을 공격하는 것이다.",
      "b) 커널 모드 권한을 가진 상태에서 유저 영역에 있는 악성 코드로 점프하여 실행하는 것이다.",
      "c) 유저 프로그램이 종료될 때 커널로 리턴하는 정상적인 과정이다.",
      "d) 루트킷을 설치하지 않고 권한을 상승시키는 모든 공격을 말한다.",
      "e) ASLR을 우회하기 위해 라이브러리 함수로 리턴하는 것이다."
    ],
    answer: 1,
    explanation: "ret2usr는 커널 취약점을 이용해 커널 모드 권한(Ring 0)을 유지한 채, 공격자가 유저 영역(User Space)에 미리 준비해 둔 악성 코드로 실행 흐름을 점프시키는 공격입니다."
  },
  {
    id: 21,
    category: "OS Kernel Security & Defenses",
    question: "ret2usr 공격을 방어하기 위해 x86 아키텍처에서 도입된 하드웨어 기능으로, 커널 모드에서 유저 영역의 코드를 실행하지 못하게 하는 것은?",
    options: [
      "a) SMAP (Supervisor Mode Access Prevention)",
      "b) SMEP (Supervisor Mode Execution Prevention)",
      "c) NX (No-Execute)",
      "d) PXN (Privileged Execute Never)",
      "e) PAC (Pointer Authentication Code)"
    ],
    answer: 1,
    explanation: "SMEP(Supervisor Mode Execution Prevention)는 커널 모드(Supervisor)에서 유저 영역의 메모리에 있는 코드를 실행(Execution)하려고 할 때 예외를 발생시켜 차단하는 하드웨어 기능입니다."
  },
  {
    id: 22,
    category: "OS Kernel Security & Defenses",
    question: "ARM 아키텍처에서 SMEP와 유사한 역할을 하는(커널이 유저 영역 코드를 실행하는 것을 방지) 기능의 명칭은?",
    options: [
      "a) PAN (Privileged Access Never)",
      "b) PXN (Privileged Execute Never)",
      "c) TrustZone",
      "d) Jazelle",
      "e) Thumb-2"
    ],
    answer: 1,
    explanation: "ARM에서는 이를 PXN(Privileged Execute Never)이라고 부르며, 특권 모드에서 유저 영역 코드를 실행하는 것을 방지합니다."
  },
  {
    id: 23,
    category: "OS Kernel Security & Defenses",
    question: "커널이 유저 영역의 데이터를 읽거나 써야 할 때(예: copy_from_user), SMAP/PAN과 같은 방어 기법이 활성화되어 있다면 어떻게 해야 하는가?",
    options: [
      "a) 방어 기법을 영구적으로 비활성화하고 재부팅한다.",
      "b) 해당 데이터가 있는 페이지를 커널 영역으로 복사한 후 접근한다.",
      "c) 일시적으로 해당 방어 기능을 비활성화하는 명령(예: stac / clac)을 수행하고 접근 후 다시 활성화한다.",
      "d) 유저 영역 데이터를 읽는 것을 포기하고 에러를 반환한다.",
      "e) 하이퍼바이저에게 데이터 접근을 위임한다."
    ],
    answer: 2,
    explanation: "SMAP/PAN이 활성화된 상태에서 커널이 합법적으로 유저 데이터를 접근하려면, stac(Set AC flag) 등의 명령어로 잠시 보호 기능을 끄고 데이터를 접근한 뒤 clac으로 다시 켜야 합니다."
  },
  {
    id: 24,
    category: "OS Kernel Security & Defenses",
    question: "다음 중 'Control Flow Hijacking'의 예시가 아닌 것은?",
    options: [
      "a) Return Address Overwrite",
      "b) Function Pointer Overwrite",
      "c) GOT Overwrite",
      "d) SQL Injection",
      "e) C++ Vtable Overwrite"
    ],
    answer: 3,
    explanation: "SQL Injection은 데이터베이스 쿼리를 조작하는 공격으로, 프로그램 메모리 상의 실행 흐름(Instruction Pointer)을 가로채는 Control Flow Hijacking과는 범주가 다릅니다."
  },
  {
    id: 25,
    category: "OS Kernel Security & Defenses",
    question: "checksec 도구 결과 No PIE라고 출력되었다면, 공격자 입장에서 어떤 이점이 있는가?",
    options: [
      "a) 스택 카나리가 없어서 버퍼 오버플로우가 쉽다.",
      "b) 실행 파일의 코드(Text) 영역 주소가 고정되어 있어 ROP 가젯을 찾기 쉽다.",
      "c) 힙 영역에 실행 권한이 있어 쉘코드를 실행할 수 있다.",
      "d) GOT 테이블을 덮어쓸 수 있다.",
      "e) 커널 영역의 주소를 알 수 있다."
    ],
    answer: 1,
    explanation: "No PIE는 바이너리의 코드 영역이 고정된 주소에 로딩됨을 의미합니다. 이는 ASLR 환경에서도 공격자가 ROP 가젯을 찾거나 ret2text 공격을 수행할 때 고정된 주소를 사용할 수 있게 해줍니다."
  },
  {
    id: 26,
    category: "OS Kernel Security & Defenses",
    question: "다음 코드 조각에서 발생할 수 있는 취약점은? printf(user_input);",
    options: [
      "a) Buffer Overflow",
      "b) Integer Overflow",
      "c) Format String Bug (FSB)",
      "d) Use-After-Free",
      "e) Null Pointer Dereference"
    ],
    answer: 2,
    explanation: "printf(user_input)과 같이 포맷 스트링 인자를 사용자 입력으로 직접 받으면, %x, %n 등의 포맷 지정자를 통해 메모리 유출이나 변조가 가능한 Format String Bug가 발생합니다."
  },
  {
    id: 27,
    category: "OS Kernel Security & Defenses",
    question: "Format String Bug를 이용해 공격자가 할 수 있는 행위로 적절하지 않은 것은?",
    options: [
      "a) 스택 메모리의 내용 읽기 (Memory Leak)",
      "b) 임의의 메모리 주소에 값 쓰기 (%n 등 활용)",
      "c) 스택 카나리 값 유출",
      "d) 커널 모드로 즉시 권한 상승 (추가적인 익스플로잇 없이)",
      "e) GOT 엔트리 변조"
    ],
    answer: 3,
    explanation: "FSB를 통해 메모리 읽기/쓰기가 가능하여 권한 상승 공격의 발판이 될 수는 있지만, FSB 자체만으로 즉시 커널 모드(Ring 0)로 진입하는 것은 불가능합니다."
  },
  {
    id: 28,
    category: "OS Kernel Security & Defenses",
    question: "리눅스 시스템에서 프로세스의 메모리 맵(Memory Map)을 확인할 수 있는 파일 경로는?",
    options: [
      "a) /proc/cpuinfo",
      "b) /proc/[pid]/maps",
      "c) /etc/fstab",
      "d) /boot/System.map",
      "e) /dev/mem"
    ],
    answer: 1,
    explanation: "리눅스에서 /proc/[pid]/maps 파일은 해당 프로세스의 가상 메모리 매핑 정보(코드, 데이터, 힙, 스택, 라이브러리 주소 범위 및 권한)를 보여줍니다."
  },
  {
    id: 29,
    category: "OS Kernel Security & Defenses",
    question: "페이지 테이블 엔트리(PTE)의 속성 중, 해당 페이지가 물리 메모리에 존재하는지를 나타내는 비트는?",
    options: [
      "a) R/W (Read/Write)",
      "b) U/S (User/Supervisor)",
      "c) P (Present)",
      "d) D (Dirty)",
      "e) A (Accessed)"
    ],
    answer: 2,
    explanation: "P(Present) 비트는 해당 페이지가 물리 메모리에 로드되어 있는지를 나타냅니다. 0이면 페이지 폴트가 발생합니다."
  },
  {
    id: 30,
    category: "OS Kernel Security & Defenses",
    question: "공격자가 system(\"/bin/sh\")를 실행하기 위해 ROP 체인을 구성할 때, 64비트 리눅스(System V AMD64 ABI)에서 첫 번째 인자(/bin/sh 주소)를 전달하기 위해 사용해야 하는 레지스터는?",
    options: [
      "a) EAX",
      "b) RDI",
      "c) RSI",
      "d) RDX",
      "e) RCX"
    ],
    answer: 1,
    explanation: "64비트 리눅스(System V AMD64 ABI) 함수 호출 규약에서 첫 번째 인자는 RDI 레지스터를 통해 전달됩니다."
  },
  {
    id: 31,
    category: "OS Kernel Security & Defenses",
    question: "ASLR 환경에서 라이브러리(libc)의 베이스 주소를 구하는 일반적인 방법은?",
    options: [
      "a) 추측하여 맞춘다 (Brute force only).",
      "b) Info Leak 취약점을 이용해 라이브러리 내 특정 함수의 주소를 얻은 후, 해당 함수의 오프셋을 뺀다.",
      "c) 스택의 주소에 0x1000을 더한다.",
      "d) 커널 로그를 확인한다.",
      "e) PLT 테이블의 첫 번째 엔트리를 읽는다."
    ],
    answer: 1,
    explanation: "ASLR 환경에서는 라이브러리 베이스 주소가 랜덤화되지만, 라이브러리 내부 함수 간의 오프셋은 고정입니다. 따라서 Info Leak으로 특정 함수의 실제 주소를 알아내고, 그 함수의 오프셋을 빼면 베이스 주소를 계산할 수 있습니다."
  },
  {
    id: 32,
    category: "OS Kernel Security & Defenses",
    question: "다음 중 'Lazy Binding' 과정을 수행하는 링커(Resolver)의 역할은?",
    options: [
      "a) 프로그램 시작 시 모든 함수 주소를 GOT에 채워 넣는다.",
      "b) 함수가 처음 호출될 때 실제 주소를 찾아 GOT를 업데이트한다.",
      "c) 스택 카나리 값을 생성한다.",
      "d) ASLR 엔트로피를 결정한다.",
      "e) 바이너리의 무결성을 검증한다."
    ],
    answer: 1,
    explanation: "Lazy Binding은 프로그램 시작 속도를 높이기 위해, 함수가 실제로 처음 호출되는 시점에 링커(Resolver)가 주소를 찾아 GOT를 채우는 방식입니다."
  },
  {
    id: 33,
    category: "OS Kernel Security & Defenses",
    question: "인텔 CPU의 CR3 레지스터가 저장하고 있는 값은 무엇인가?",
    options: [
      "a) 현재 실행 중인 프로세스의 최상위 페이지 테이블(Page Directory)의 물리 주소",
      "b) 커널 스택의 최상위 주소",
      "c) 인터럽트 벡터 테이블의 시작 주소",
      "d) 현재 실행 중인 명령어의 주소 (EIP/RIP)",
      "e) 시스템 콜 테이블의 베이스 주소"
    ],
    answer: 0,
    explanation: "x86에서 CR3 레지스터는 현재 프로세스의 페이지 디렉토리 베이스 주소(Page Directory Base Address)를 저장하여 MMU가 가상 주소를 물리 주소로 변환할 때 참조합니다."
  },
  {
    id: 34,
    category: "OS Kernel Security & Defenses",
    question: "공격자가 커널 익스플로잇을 통해 commit_creds (prepare_kernel_cred (0))를 실행하려는 목적은?",
    options: [
      "a) 커널 패닉을 유발하여 시스템을 마비시키기 위함",
      "b) 현재 프로세스의 권한 구조체를 루트(Root, UID 0) 권한으로 변경하기 위함",
      "c) 새로운 커널 모듈을 로드하기 위함",
      "d) 메모리 덤프를 생성하기 위함",
      "e) 파일 시스템을 포맷하기 위함"
    ],
    answer: 1,
    explanation: "commit_creds(prepare_kernel_cred(0))는 리눅스 커널 익스플로잇에서 권한 상승을 위해 사용하는 전형적인 함수 호출 패턴입니다. prepare_kernel_cred(0)은 루트 권한의 자격 증명을 생성하고, commit_creds는 이를 현재 프로세스에 적용합니다."
  },
  {
    id: 35,
    category: "OS Kernel Security & Defenses",
    question: "다음 중 스택 피보팅(Stack Pivoting) 공격이 필요한 상황은?",
    options: [
      "a) 스택 버퍼 오버플로우 공간이 ROP 체인을 넣기에 너무 부족할 때",
      "b) ASLR이 적용되어 있지 않을 때",
      "c) 스택 카나리가 없을 때",
      "d) 함수가 리턴 값을 반환하지 않을 때",
      "e) 힙 영역을 사용할 수 없을 때"
    ],
    answer: 0,
    explanation: "Stack Pivoting은 버퍼 오버플로우로 덮어쓸 수 있는 스택 공간이 부족할 때, 스택 포인터(ESP/RSP)를 힙이나 다른 넉넉한 공간으로 돌려서(Pivot) 그곳에 구성된 ROP 체인을 실행하게 하는 기법입니다."
  },
  {
    id: 36,
    category: "OS Kernel Security & Defenses",
    question: "32비트 시스템보다 64비트 시스템에서 ASLR이 더 효과적인 주된 이유는?",
    options: [
      "a) 64비트 CPU가 더 빠르기 때문에",
      "b) 가상 주소 공간이 훨씬 넓어 랜덤화할 수 있는 엔트로피(Entropy)가 비약적으로 증가하기 때문에",
      "c) 64비트는 하드웨어적으로 ASLR을 강제하기 때문에",
      "d) 64비트에서는 스택을 사용하지 않기 때문에",
      "e) 64비트 라이브러리는 재배치가 불가능하기 때문에"
    ],
    answer: 1,
    explanation: "32비트 주소 공간(4GB)은 엔트로피가 작아 Brute Force가 현실적으로 가능하지만, 64비트 주소 공간은 매우 방대하여 랜덤화할 수 있는 경우의 수(엔트로피)가 비약적으로 커져 추측이 거의 불가능해집니다."
  },
  {
    id: 37,
    category: "OS Kernel Security & Defenses",
    question: "다음 중 'Code Reuse Attack'에 해당하지 않는 것은?",
    options: [
      "a) Return-to-Libc (RTL)",
      "b) ROP (Return Oriented Programming)",
      "c) JOP (Jump Oriented Programming)",
      "d) Shellcode Injection (스택에 쉘코드 주입 후 실행)",
      "e) ret2plt"
    ],
    answer: 3,
    explanation: "Code Reuse Attack은 메모리에 이미 존재하는 코드(라이브러리, 가젯 등)를 재사용하는 공격입니다. 쉘코드 인젝션(Shellcode Injection)은 공격자가 새로운 코드를 주입하여 실행하는 방식이므로 Code Reuse가 아닙니다."
  },
  {
    id: 38,
    category: "OS Kernel Security & Defenses",
    question: "리눅스에서 checksec 명령어로 바이너리를 분석했을 때 NX enabled 가 의미하는 것은?",
    options: [
      "a) ASLR이 활성화됨",
      "b) 스택 카나리가 적용됨",
      "c) 스택 및 힙 영역에서 코드 실행이 방지됨 (DEP)",
      "d) GOT가 읽기 전용임",
      "e) 심볼 테이블이 제거됨"
    ],
    answer: 2,
    explanation: "NX(No-Execute)가 활성화되었다는 것은 스택이나 힙 영역에 실행 권한이 없다는 뜻으로, DEP(Data Execution Prevention)가 적용되었음을 의미합니다."
  },
  {
    id: 39,
    category: "OS Kernel Security & Defenses",
    question: "커널 메모리 보호를 위해 ARM 아키텍처에서 사용하는 도메인 접근 제어(Domain Access Control)나 AP(Access Permission) 비트의 역할은?",
    options: [
      "a) 유저 모드에서 커널 메모리에 접근하는 것을 차단한다.",
      "b) 커널 모드끼리의 통신을 암호화한다.",
      "c) 가상 메모리를 물리 메모리로 변환하는 것을 가속화한다.",
      "d) 인터럽트 발생 시 우선순위를 결정한다.",
      "e) 멀티코어 프로세서 간의 캐시 일관성을 유지한다."
    ],
    answer: 0,
    explanation: "ARM의 AP(Access Permission) 비트나 도메인 접근 제어는 유저 모드에서 커널 메모리 영역에 접근하는 것을 하드웨어적으로 차단하여 커널 메모리를 보호합니다."
  },
  {
    id: 40,
    category: "OS Kernel Security & Defenses",
    question: "다음 중 Rootkit이 시스템 콜을 후킹(Hooking)하는 일반적인 방법은?",
    options: [
      "a) 시스템 콜 핸들러 함수의 코드를 직접 패치(Inline Hooking)하거나 시스템 콜 테이블의 함수 포인터를 변경한다.",
      "b) CPU의 클럭 속도를 조절한다.",
      "c) 하드디스크의 MBR(Master Boot Record)을 수정한다.",
      "d) 네트워크 카드의 펌웨어를 조작한다.",
      "e) 유저 프로세스의 스택을 덮어쓴다."
    ],
    answer: 0,
    explanation: "루트킷은 주로 시스템 콜 테이블의 함수 포인터를 자신이 작성한 악성 함수의 주소로 바꿔치기(Hooking)하여, 사용자의 시스템 콜 요청을 가로채고 조작합니다."
  },
  {
    id: 41,
    category: "OS Kernel Security & Defenses",
    question: "스택 카나리 값의 첫 바이트가 주로 NULL(0x00)인 이유는?",
    options: [
      "a) 랜덤 값을 생성하는 함수의 오류 때문이다.",
      "b) 문자열 함수(strcpy 등)가 카나리 값을 읽거나 덮어쓸 때 NULL을 만나 멈추게 하여 유출/변조를 어렵게 하기 위함이다.",
      "c) 리틀 엔디안 아키텍처의 특성상 하위 바이트가 무시되기 때문이다.",
      "d) 스택의 끝임을 표시하기 위한 약속이다.",
      "e) 컴파일러의 최적화 옵션 때문이다."
    ],
    answer: 1,
    explanation: "C언어 문자열 함수들은 NULL을 문자열의 끝으로 인식합니다. 카나리 값에 NULL이 포함되어 있으면 strcpy 등으로 카나리 값을 덮어쓰거나 읽어낼 때 NULL에서 멈추게 되어 공격을 어렵게 만듭니다."
  },
  {
    id: 42,
    category: "OS Kernel Security & Defenses",
    question: "ret2text 공격이 유효한 조건으로 가장 적절한 것은?",
    options: [
      "a) 프로그램 코드 영역(Text Segment)의 주소가 랜덤화되지 않았거나(No PIE), 주소를 미리 알고 있는 경우",
      "b) 스택 카나리가 활성화되어 있는 경우",
      "c) NX 비트가 설정되어 있는 경우",
      "d) 프로그램이 정적 링크(Static Linking)되어 있는 경우",
      "e) 라이브러리 함수를 전혀 사용하지 않는 경우"
    ],
    answer: 0,
    explanation: "ret2text는 프로그램 자체의 코드 영역(Text Segment)에 있는 함수나 가젯을 이용하는 공격입니다. PIE가 적용되지 않아 코드 영역 주소가 고정되어 있거나 주소를 아는 경우에 가능합니다."
  },
  {
    id: 43,
    category: "OS Kernel Security & Defenses",
    question: "인텔 TSX(Transactional Synchronization Extensions)를 이용한 KASLR 우회 공격에서 트랜잭션이 실패(Abort)할 때의 특징은?",
    options: [
      "a) 시스템이 즉시 재부팅된다.",
      "b) 예외(Exception)가 운영체제로 전달되지 않고 억제(Suppress)되어 프로그램이 중단되지 않는다.",
      "c) 커널 메모리가 초기화된다.",
      "d) 해당 프로세스의 권한이 상승한다.",
      "e) TLB가 플러시(Flush)되지 않는다."
    ],
    answer: 1,
    explanation: "TSX 트랜잭션 도중 오류가 발생하면, 운영체제에 인터럽트를 발생시키지 않고 조용히 트랜잭션을 중단(Abort)하고 롤백합니다. 공격자는 이를 이용해 크래시 없이 메모리 접근을 시도하며 타이밍을 측정할 수 있습니다."
  },
  {
    id: 44,
    category: "OS Kernel Security & Defenses",
    question: "다음 중 하드웨어 디버거(JTAG 등)를 사용할 때의 장점이 아닌 것은?",
    options: [
      "a) OS 커널이 멈춘 상태(Halt)에서도 디버깅이 가능하다.",
      "b) CPU 레지스터 및 메모리 상태를 직접 관찰할 수 있다.",
      "c) 부트로더나 초기 커널 초기화 과정도 디버깅할 수 있다.",
      "d) 소프트웨어 디버거(GDB 등)보다 설치와 사용이 매우 간편하고 비용이 저렴하다.",
      "e) 타겟 보드의 하드웨어적인 제어가 가능하다."
    ],
    answer: 3,
    explanation: "하드웨어 디버거는 별도의 장비(JTAG 프로브 등)가 필요하며, 소프트웨어 디버거에 비해 비용이 비싸고 설정이 복잡할 수 있습니다."
  },
  {
    id: 45,
    category: "OS Kernel Security & Defenses",
    question: "lsmod 명령어 결과에서 특정 루트킷 모듈이 보이지 않게 하기 위해 공격자가 조작하는 커널 데이터 구조는?",
    options: [
      "a) 프로세스 제어 블록(PCB)",
      "b) 시스템 콜 테이블",
      "c) 커널 모듈 리스트(Linked List)",
      "d) 인터럽트 디스크립터 테이블(IDT)",
      "e) 페이지 테이블"
    ],
    answer: 2,
    explanation: "커널 모듈들은 리스트 형태로 관리됩니다. 루트킷은 이 리스트의 prev, next 포인터를 조작하여 자신의 모듈 노드만 건너뛰게 만듦으로써 lsmod 목록에서 자신을 숨깁니다."
  },
  {
    id: 46,
    category: "OS Kernel Security & Defenses",
    question: "다음 중 'Spectre'나 'Meltdown'과 같은 공격이 악용하는 CPU의 성능 최적화 기법은?",
    options: [
      "a) Paging",
      "b) Segmentation",
      "c) Speculative Execution (추측 실행) 및 Out-of-Order Execution",
      "d) Context Switching",
      "e) DMA (Direct Access Memory)"
    ],
    answer: 2,
    explanation: "스펙터와 멜트다운은 CPU의 성능 향상을 위해 도입된 '비순차 실행(Out-of-Order Execution)'과 '추측 실행(Speculative Execution)' 과정에서 발생하는 부채널(Side Channel) 취약점을 악용한 것입니다."
  },
  {
    id: 47,
    category: "OS Kernel Security & Defenses",
    question: "안드로이드 시스템에서 zygote 프로세스의 특징과 보안적 함의는?",
    options: [
      "a) 모든 앱 프로세스의 부모 프로세스이므로, ASLR 등에 의해 랜덤화된 메모리 레이아웃이 자식 프로세스(앱)들에게 그대로 상속될 수 있다.",
      "b) 커널 모드에서만 실행되는 특수 프로세스이다.",
      "c) 네트워크 통신을 전담하는 프로세스이다.",
      "d) 화면 출력을 담당하는 프로세스이다.",
      "e) 보안상 안전하여 공격 대상이 되지 않는다."
    ],
    answer: 0,
    explanation: "안드로이드에서 모든 앱은 zygote 프로세스를 포크(fork)하여 생성됩니다. 따라서 zygote의 메모리 레이아웃(ASLR 적용 결과)이 모든 앱에 그대로 복제되므로, 하나의 앱에서 메모리 구조를 파악하면 다른 앱의 구조도 예측 가능해지는 보안 약점이 있습니다."
  },
  {
    id: 48,
    category: "OS Kernel Security & Defenses",
    question: "mprotect 함수를 이용하여 메모리 영역의 권한을 변경하는 공격 기법은 주로 어떤 보호 기법을 우회하기 위함인가?",
    options: [
      "a) ASLR",
      "b) DEP (NX) - 쉘코드가 있는 영역에 실행 권한(RWX)을 부여하기 위해",
      "c) Canary",
      "d) RELRO",
      "e) KASLR"
    ],
    answer: 1,
    explanation: "mprotect 함수는 메모리 페이지의 권한을 변경할 수 있습니다. 공격자는 쉘코드가 저장된 데이터 영역(스택/힙)의 권한을 '실행 가능(RX/RWX)'으로 변경하여 DEP/NX 방어 기법을 무력화하고 쉘코드를 실행합니다."
  },
  {
    id: 49,
    category: "OS Kernel Security & Defenses",
    question: "다음 중 Copy-On-Write(COW) 메커니즘의 설명으로 옳은 것은?",
    options: [
      "a) 데이터를 읽을 때마다 복사본을 생성한다.",
      "b) 부모와 자식 프로세스가 처음에는 메모리를 공유하다가, 한 쪽이 쓰기(Write) 작업을 할 때 비로소 복사가 일어난다.",
      "c) 메모리 복사를 원천적으로 차단한다.",
      "d) 하드디스크의 내용을 메모리로 복사할 때만 사용된다.",
      "e) 커널 메모리를 유저 영역으로 복사할 때 사용된다."
    ],
    answer: 1,
    explanation: "COW는 fork() 시 부모와 자식 프로세스가 물리 메모리를 공유하다가, 어느 한 쪽이 데이터를 수정하려고 할 때 비로소 복사가 일어나는 최적화 기법입니다."
  },
  {
    id: 50,
    category: "OS Kernel Security & Defenses",
    question: "보안 방어 기법과 그에 대한 우회 기법의 연결이 적절하지 않은 것은?",
    options: [
      "a) Stack Canary - Brute Force (Forking Server)",
      "b) DEP (NX) - ROP (Return Oriented Programming)",
      "c) ASLR - Information Leak / NOP Sled",
      "d) Full RELRO - GOT Hijacking",
      "e) SMAP - ROP (User space ROP chain)"
    ],
    answer: 3,
    explanation: "Full RELRO는 GOT 영역을 읽기 전용으로 설정하여 GOT Hijacking 공격을 원천적으로 차단합니다. 따라서 Full RELRO에 대한 우회 기법으로 GOT Hijacking은 적절하지 않습니다."
  }
];

// --- 컴포넌트 ---

export default function QuizPage5() {
  return (
    <QuizTemplate 
      title="소프트웨어 및 시스템 보안" 
      subtitle="Kernel & Defense"
      quizData={quizData} 
    />
  );
}