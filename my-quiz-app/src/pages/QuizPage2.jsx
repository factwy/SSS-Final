import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, BookOpen, PenTool, RefreshCw, AlertCircle } from 'lucide-react';
import QuizTemplate from './QuizTemplate';

// --- 데이터 정의 (PDF 내용을 바탕으로 구성) ---
const questions = [
  {
    id: 1,
    category: "Software Defense",
    question: "DEP(Data Execution Prevention) 또는 NX(No-Execute) 비트가 적용된 시스템에서 스택 버퍼 오버플로우 공격을 수행할 때, 공격자가 직면하게 되는 가장 주된 어려움은 무엇인가?",
    options: [
      "a) 스택의 리턴 주소를 덮어쓰는 것이 물리적으로 불가능해진다.",
      "b) 스택에 주입한 쉘코드(Shellcode)로 제어 흐름을 옮겨도 코드가 실행되지 않고 예외(Exception)가 발생한다.",
      "c) 함수의 프롤로그(Prologue)와 에필로그(Epilogue) 과정이 암호화되어 분석할 수 없다.",
      "d) 메모리 주소가 매 실행마다 랜덤하게 변경되어 쉘코드의 위치를 특정할 수 없다.",
      "e) 스택 프레임의 크기가 동적으로 변하여 버퍼의 크기를 예측할 수 없다."
    ],
    answer: 1,
    explanation: "DEP(NX)는 스택이나 힙과 같은 데이터 영역에 '실행 불가(Non-Executable)' 속성을 부여합니다. 따라서 공격자가 쉘코드를 스택에 주입하고 제어 흐름을 그곳으로 옮기더라도, CPU가 해당 영역의 실행 권한이 없음을 감지하고 예외를 발생시켜 코드가 실행되지 않습니다."
  },
  {
    id: 2,
    category: "Software Defense",
    question: "다음 중 리눅스 환경에서 DEP(Data Execution Prevention)를 우회하기 위해 가장 흔히 사용되는 공격 기법은 무엇인가?",
    options: [
      "a) NOP Sledding",
      "b) Heap Spraying",
      "c) RTL (Return-to-Libc) 또는 ROP (Return Oriented Programming)",
      "d) Integer Overflow",
      "e) Race Condition"
    ],
    answer: 2,
    explanation: "DEP로 인해 직접 주입한 코드를 실행할 수 없게 되자, 공격자들은 메모리에 이미 적재되어 있고 실행 권한이 있는 코드(라이브러리 함수, 프로그램 코드 조각 등)를 재사용하는 RTL이나 ROP 기법을 사용하여 우회합니다."
  },
  {
    id: 3,
    category: "Software Defense",
    question: "Stack Canary(스택 카나리) 기법의 동작 원리에 대한 설명으로 가장 적절한 것은?",
    options: [
      "a) 함수 호출 시 리턴 주소를 별도의 안전한 'Shadow Stack'에 저장하고 복귀 시 비교한다.",
      "b) 스택 프레임 내의 지역 변수 순서를 재배치하여 버퍼 오버플로우가 중요 변수를 덮어쓰지 못하게 한다.",
      "c) 리턴 주소(Return Address)와 EBP 사이에 랜덤한 값을 삽입하고, 함수 종료 시 이 값이 변조되었는지 검증한다.",
      "d) 컴파일러가 소스 코드의 취약한 strcpy 함수를 안전한 strncpy 함수로 자동으로 치환한다.",
      "e) 실행 파일의 코드 영역을 읽기 전용(Read-Only)으로 설정하여 코드 변조를 막는다."
    ],
    answer: 2,
    explanation: "스택 카나리는 버퍼와 리턴 주소(RET) 사이에 위치하는 특정 값입니다. 함수 프롤로그에서 이 값을 스택에 저장하고, 에필로그에서 이 값이 변조되었는지 비교합니다."
  },
  {
    id: 4,
    category: "Software Defense",
    question: "리눅스(ELF 바이너리) 환경에서 Stack Canary 값이 저장되는 위치로, 공격자가 Canary 값을 유출하거나 참조하기 위해 접근하는 세그먼트 레지스터 및 오프셋은? (x86 아키텍처 기준)",
    options: [
      "a) fs:0x14",
      "b) gs:0x14",
      "c) ss:0x08",
      "d) cs:0x10",
      "e) ds:0x20"
    ],
    answer: 1,
    explanation: "32비트 리눅스 환경(x86)에서 카나리 값은 주로 gs 세그먼트 레지스터의 0x14 오프셋에 저장된 랜덤 값을 참조하여 가져옵니다. (64비트에서는 fs:0x28을 주로 사용)"
  },
  {
    id: 5,
    category: "Software Defense",
    question: "Stack Canary 기법이 적용되어 있음에도 불구하고 이를 우회하거나 무력화할 수 있는 시나리오로 적절하지 않은 것은?",
    options: [
      "a) 공격자가 임의 메모리 읽기(Arbitrary Memory Read) 취약점을 통해 현재 설정된 Canary 값을 알아낸 경우",
      "b) fork() 시스템 콜을 사용하는 서버에서 자식 프로세스가 죽어도 Canary 값이 재생성되지 않고 부모와 동일하게 유지되어 1바이트씩 Brute Force가 가능한 경우",
      "c) 포맷 스트링 버그(Format String Bug)를 이용하여 Canary 검증 로직을 건너뛰고 리턴 주소만 선택적으로 덮어쓰는 경우",
      "d) 공격자가 스택이 아닌 힙(Heap) 영역의 함수 포인터를 덮어써서 제어 흐름을 가로채는 경우",
      "e) 공격자가 NOP Sled를 길게 주입하여 Canary 검증 루틴이 NOP 명령어라고 착각하게 만드는 경우"
    ],
    answer: 4,
    explanation: "NOP Sled는 주소 추측의 오차를 줄이기 위한 기법이지 카나리 검증을 우회하는 기법은 아닙니다. 카나리 검증 코드는 NOP 여부와 상관없이 특정 위치의 값이 원본과 같은지만 비교합니다."
  },
  {
    id: 6,
    category: "Software Defense",
    question: "ASLR(Address Space Layout Randomization)이 적용되었을 때, 랜덤화되는 메모리 영역끼리 올바르게 짝지어진 것은?",
    options: [
      "a) Stack, Heap, Library, (옵션에 따라) Code(Text) 영역",
      "b) Stack, CPU Register, Cache Line",
      "c) BIOS, Kernel Image, Boot Loader",
      "d) Global Descriptor Table (GDT), Interrupt Descriptor Table (IDT)",
      "e) L1 Cache, L2 Cache, Main Memory"
    ],
    answer: 0,
    explanation: "ASLR은 공격자가 메모리 주소를 예측하지 못하도록 스택, 힙, 라이브러리(mmap), 그리고 PIE가 적용된 경우 코드 영역의 베이스 주소를 랜덤화합니다."
  },
  {
    id: 7,
    category: "Software Defense",
    question: "ASLR 환경에서 공격자가 쉘코드로 제어 흐름을 이동시키기 위해 메모리 주소를 추측할 때, 확률을 높이기 위해 사용하는 'NOP Sled' 기법의 주된 목적은 무엇인가?",
    options: [
      "a) 쉘코드의 암호화를 해제하기 위한 키 공간을 확보한다.",
      "b) 정확한 주소를 맞추지 못하더라도, NOP 영역 중 어디든 떨어지면 타고 내려가서 쉘코드가 실행되도록 유효 타격 범위를 넓힌다.",
      "c) CPU의 파이프라인을 비워서 실행 속도를 높인다.",
      "d) 스택 카나리 검증 코드를 NOP 명령어로 덮어씌워 무력화한다.",
      "e) 운영체제의 감시 기능을 일시적으로 정지시킨다."
    ],
    answer: 1,
    explanation: "NOP Sled는 쉘코드 앞에 아무 동작도 하지 않는 NOP(0x90) 명령어를 길게 채워 넣어, 공격자가 NOP 영역 중 어느 곳으로든 점프하면 타고 내려가서 결국 쉘코드를 실행하게 만드는 기법입니다."
  },
  {
    id: 8,
    category: "Software Defense",
    question: "다음 중 'PIE (Position Independent Executable)' 컴파일 옵션(-fPIE -pie)의 효과로 가장 올바른 것은?",
    options: [
      "a) 실행 파일의 바이너리 크기를 줄여 로딩 속도를 최적화한다.",
      "b) 라이브러리 함수들이 정적으로 링크되어 외부 라이브러리 의존성을 제거한다.",
      "c) 실행 파일의 코드(Text) 영역까지도 랜덤한 주소에 로딩되게 하여, 코드 영역의 주소 고정을 이용한 공격(ret2text 등)을 어렵게 한다.",
      "d) 스택 영역에 실행 권한을 부여하여 호환성을 높인다.",
      "e) 모든 전역 변수를 레지스터에 할당하여 메모리 접근을 최소화한다."
    ],
    answer: 2,
    explanation: "PIE 옵션을 사용하면 실행 파일 자체가 위치 독립적으로 컴파일되어, 실행 시 코드 영역도 ASLR의 영향을 받아 랜덤한 주소에 로딩됩니다."
  },
  {
    id: 9,
    category: "Software Defense",
    question: "ASLR을 우회하기 위한 'Brute Force' 공격이 현실적으로 가장 유효한 환경은?",
    options: [
      "a) 64비트 시스템이며, 프로세스가 충돌 시 완전히 새로운 인스턴스로 재시작되는 환경",
      "b) 32비트 시스템이며, fork()를 통해 생성된 자식 프로세스가 충돌 시 부모 프로세스가 즉시 새로운 자식을 동일한 메모리 레이아웃으로 생성하는 데몬 환경",
      "c) 커널 레벨의 ASLR(KASLR)이 적용된 최신 윈도우 10 환경",
      "d) 하드웨어 기반의 난수 생성기를 사용하여 엔트로피가 극도로 높은 환경",
      "e) 한 번 실행되고 종료되는 클라이언트 측 단일 응용 프로그램"
    ],
    answer: 1,
    explanation: "32비트 시스템은 엔트로피가 좁고, fork()를 사용하는 서버는 자식 프로세스가 죽어도 부모가 즉시 동일한 메모리 레이아웃을 가진 자식을 재생성하므로 Brute Force 공격에 취약합니다."
  },
  {
    id: 10,
    category: "Software Defense",
    question: "공격자가 printf 함수의 주소를 알고 있을 때, system 함수의 주소를 계산하여 공격(ret2libc)에 활용할 수 있는 이유는 무엇인가?",
    options: [
      "a) 두 함수는 항상 메모리 상에서 인접하게 배치되도록 컴파일러가 최적화하기 때문이다.",
      "b) ASLR은 베이스 주소만 랜덤화할 뿐, 라이브러리 파일 내부에서의 함수 간 상대적 거리(Offset)는 고정되어 있기 때문이다.",
      "c) printf 함수 내부에 system 함수를 호출하는 코드가 포함되어 있기 때문이다.",
      "d) 운영체제가 보안을 위해 중요 함수의 주소를 환경 변수에 저장해 두기 때문이다.",
      "e) system 함수는 printf 함수의 별칭(Alias)으로 동작하기 때문이다."
    ],
    answer: 1,
    explanation: "ASLR은 모듈의 시작 주소(Base Address)만 랜덤화합니다. 라이브러리 파일 내부의 함수 간 오프셋은 고정되어 있으므로, 하나의 주소를 알면 다른 함수의 주소도 계산할 수 있습니다."
  },
  {
    id: 11,
    category: "Software Defense",
    question: "'GOT (Global Offset Table)'와 'PLT (Procedure Linkage Table)'를 이용한 'Lazy Binding' 메커니즘에 대한 설명으로 옳은 것은?",
    options: [
      "a) 프로그램 시작 시 모든 라이브러리 함수의 주소를 즉시 GOT에 기록하여 실행 속도를 높인다.",
      "b) 함수가 처음 호출될 때는 링커(Resolver)를 통해 주소를 찾아 GOT에 기록하고, 두 번째 호출부터는 기록된 주소를 바로 사용한다.",
      "c) PLT는 변수의 값을 저장하고, GOT는 코드를 저장하는 영역이다.",
      "d) GOT 영역은 항상 Read-Only 권한을 가지므로 공격자가 덮어쓸 수 없다.",
      "e) Lazy Binding은 정적 링킹(Static Linking)된 바이너리에서만 사용되는 기법이다."
    ],
    answer: 1,
    explanation: "성능 저하를 막기 위해, 실제 해당 함수가 처음 호출되는 시점에 링커가 주소를 찾아 GOT에 기록하는 방식을 Lazy Binding이라고 합니다."
  },
  {
    id: 12,
    category: "Software Defense",
    question: "GOT Hijacking 공격이 가능한 근본적인 이유는 무엇인가?",
    options: [
      "a) PLT 코드가 힙 영역에 위치하기 때문이다.",
      "b) GOT 영역이 런타임에 함수 주소를 업데이트하기 위해 '쓰기 권한(Write Permission)'을 가지고 있기 때문이다.",
      "c) 스택 카나리가 GOT 영역을 보호하지 않기 때문이다.",
      "d) ASLR이 GOT 영역의 위치를 랜덤화하지 않기 때문이다.",
      "e) CPU가 GOT 영역의 실행 권한을 강제로 활성화하기 때문이다."
    ],
    answer: 1,
    explanation: "Lazy Binding을 지원하기 위해 GOT 영역은 런타임에 쓰기 권한이 있어야 합니다. 공격자는 이를 악용하여 함수 주소를 덮어씁니다."
  },
  {
    id: 13,
    category: "Software Defense",
    question: "RELRO (Relocation Read-Only) 보호 기법 중 'Partial RELRO'와 'Full RELRO'의 결정적인 차이는 무엇인가?",
    options: [
      "a) Partial RELRO는 스택만 보호하고, Full RELRO는 힙까지 보호한다.",
      "b) Partial RELRO는 프로그램 시작 시점에 심볼을 해석(Binding)하지 않지만, Full RELRO는 시작 시점에 모든 심볼을 해석하고 GOT를 'Read-Only'로 변경한다.",
      "c) Full RELRO는 ASLR 기능을 포함하지만, Partial RELRO는 포함하지 않는다.",
      "d) Partial RELRO는 32비트 전용이고, Full RELRO는 64비트 전용이다.",
      "e) Full RELRO는 바이너리 실행 속도를 획기적으로 개선하지만 보안성이 낮다."
    ],
    answer: 1,
    explanation: "Full RELRO(-z now)는 시작 시 모든 심볼을 바인딩하고 GOT 영역 전체를 'Read-Only'로 변경하여 GOT Hijacking을 원천 차단합니다."
  },
  {
    id: 14,
    category: "Software Defense",
    question: "공격자가 스택 오버플로우 취약점을 이용해 ptr 포인터를 조작하여 GOT 엔트리를 덮어쓰려 한다. 이때 'Full RELRO'가 적용되어 있다면 공격은 어떻게 되는가?",
    options: [
      "a) GOT 영역이 쓰기 금지(Read-Only) 상태이므로 세그멘테이션 폴트(Segmentation Fault)가 발생하고 실패한다.",
      "b) 경고 메시지만 출력되고 공격은 성공한다.",
      "c) GOT 대신 PLT를 덮어쓰게 되어 공격이 성공한다.",
      "d) 운영체제가 자동으로 공격자를 추적하여 차단한다.",
      "e) 공격 코드가 힙 영역으로 리다이렉트되어 실행된다."
    ],
    answer: 0,
    explanation: "Full RELRO가 적용되면 GOT 영역은 실행 중에 '읽기 전용' 속성을 가지므로, 쓰기를 시도하면 메모리 접근 위반으로 프로그램이 종료됩니다."
  },
  {
    id: 15,
    category: "Software Defense",
    question: "KASLR (Kernel Address Space Layout Randomization)의 주된 목적은?",
    options: [
      "a) 사용자 영역의 프로그램이 커널 영역의 코드를 읽지 못하게 암호화한다.",
      "b) 커널 모듈, 코드, 데이터 등의 적재 위치를 부팅 시마다 랜덤하게 변경하여 커널 익스플로잇(Kernel Exploit)을 어렵게 한다.",
      "c) 커널 패닉 발생 시 자동으로 재부팅하는 속도를 높인다.",
      "d) 루트(Root) 권한을 가진 사용자라도 커널 모드 진입을 불가능하게 한다.",
      "e) 가상 머신(VM) 환경에서 호스트 OS의 메모리를 보호한다."
    ],
    answer: 1,
    explanation: "KASLR은 커널 익스플로잇을 어렵게 만들기 위해 커널 이미지, 모듈 등의 로딩 위치를 부팅 시마다 랜덤하게 바꿉니다."
  },
  {
    id: 16,
    category: "Software Defense",
    question: "리눅스 커널 익스플로잇 시, 공격자가 루트 권한을 획득하기 위해 주로 호출하고자 하는 커널 함수 조합은? (강의 예시)",
    options: [
      "a) malloc(kernel) & free (kernel)",
      "b) commit_creds (prepare_kernel_cred(0))",
      "c) open(\"/etc/shadow\") & write(root)",
      "d) system(\"/bin/sh\")",
      "e) chmod(777, \"/\")"
    ],
    answer: 1,
    explanation: "prepare_kernel_cred(0)은 루트 자격 증명을 생성하고, commit_creds()는 이를 현재 프로세스에 적용하여 루트 권한을 획득하게 합니다."
  },
  {
    id: 17,
    category: "Software Defense",
    question: "KASLR을 우회하기 위한 'DrK' 공격(또는 Double Page Fault 공격)이 악용하는 하드웨어적 특성은 무엇인가?",
    options: [
      "a) CPU의 L1 캐시 데이터가 초기화되지 않는 점",
      "b) 매핑된 커널 주소와 매핑되지 않은 주소 접근 시 발생하는 페이지 폴트 처리 시간 및 TLB 업데이트의 차이(Timing Side Channel)",
      "c) Meltdown 취약점을 이용한 커널 메모리 직접 읽기",
      "d) Rowhammer 공격을 통한 물리 메모리 비트 플립",
      "e) GPU의 병렬 처리 기능을 이용한 무차별 대입"
    ],
    answer: 1,
    explanation: "DrK 공격은 인텔 TSX 기능과 결합하여, 유저 모드에서 커널 주소에 접근할 때 발생하는 페이지 폴트 처리 시간의 미세한 차이를 이용해 커널 메모리 레이아웃을 추측합니다."
  },
  {
    id: 18,
    category: "Software Defense",
    question: "인텔 CPU의 TSX (Transactional Synchronization Extensions) 기능을 악용한 KASLR 우회 공격에서, 트랜잭션이 실패(Abort)할 경우의 이점은 무엇인가?",
    options: [
      "a) 커널 모드로 즉시 진입할 수 있다.",
      "b) 예외(Exception)나 인터럽트가 운영체제로 전달되지 않고 억제(Suppress)되어, 프로그램이 충돌(Crash)하지 않고 계속 주소 스캐닝을 시도할 수 있다.",
      "c) TLB를 강제로 플러시(Flush)하여 흔적을 지울 수 있다.",
      "d) ASLR의 엔트로피를 0으로 고정시킬 수 있다.",
      "e) 루트 권한 없이도 물리 메모리에 직접 쓸 수 있다."
    ],
    answer: 1,
    explanation: "TSX 트랜잭션 안에서 발생하는 오류는 운영체제로 시그널을 보내지 않고 트랜잭션 중단으로 처리되므로, 충돌 없이 프로브 공격을 반복할 수 있습니다."
  },
  {
    id: 19,
    category: "Software Defense",
    question: "'ret2usr' (Return-to-User) 공격에 대한 설명으로 옳은 것은?",
    options: [
      "a) 사용자 프로그램이 종료될 때 커널로 리턴하는 정상적인 과정이다.",
      "b) 커널 취약점을 이용해 커널 모드(Ring 0) 권한을 가진 상태에서, 공격자가 미리 사용자 영역(User Space)에 준비해 둔 악성 코드로 제어 흐름을 점프시키는 공격이다.",
      "c) 사용자 권한을 탈취하여 다른 사용자의 계정으로 로그인하는 기법이다.",
      "d) 라이브러리 함수가 아닌 사용자 정의 함수로 리턴하는 프로그래밍 기법이다.",
      "e) 스택이 아닌 힙 영역으로 리턴하는 모든 공격을 통칭한다."
    ],
    answer: 1,
    explanation: "ret2usr는 커널의 제어 흐름을 가로챘을 때, 공격자가 접근하기 쉬운 사용자 영역에 악성 코드를 심어두고 커널이 그곳을 실행하도록 유도하는 기법입니다."
  },
  {
    id: 20,
    category: "Software Defense",
    question: "ret2usr 공격을 방어하기 위한 하드웨어 기반 보안 기법인 SMEP (Supervisor Mode Execution Prevention)의 기능은?",
    options: [
      "a) 슈퍼바이저(커널) 모드에서 사용자 영역의 페이지에 있는 코드를 실행하려고 할 때 예외(Fault)를 발생시킨다.",
      "b) 사용자 모드에서 커널 영역의 데이터를 읽으려 할 때 차단한다.",
      "c) 커널 모드에서 사용자 영역의 데이터를 읽거나 쓰는 것을 허용한다.",
      "d) 모든 커널 코드를 암호화하여 실행한다.",
      "e) 사용자 프로세스가 시스템 콜을 호출하지 못하게 막는다."
    ],
    answer: 0,
    explanation: "SMEP는 커널 모드에서 유저 모드 페이지에 있는 명령어를 실행하려고 하면 CPU가 예외를 발생시켜 차단합니다."
  },
  {
    id: 21,
    category: "Software Defense",
    question: "다음 중 ARM 아키텍처에서 SMEP와 유사한 역할을 수행하는 방어 기법의 명칭은?",
    options: [
      "a) XD (Execute Disable)",
      "b) PXN (Privileged Execute Never)",
      "c) MTE (Memory Tagging Extension)",
      "d) PAC (Pointer Authentication Code)",
      "e) TrustZone"
    ],
    answer: 1,
    explanation: "ARM 아키텍처에서는 이를 PXN(Privileged Execute Never)이라고 부르며, 커널이 사용자 영역의 코드를 실행하지 못하도록 합니다."
  },
  {
    id: 22,
    category: "Software Defense",
    question: "SMAP (Supervisor Mode Access Prevention)가 활성화된 상태에서 커널이 사용자 영역의 데이터에 합법적으로 접근해야 할 때(예: copy_from_user), 운영체제는 어떻게 동작해야 하는가?",
    options: [
      "a) SMAP 기능을 영구적으로 비활성화하고 재부팅한다.",
      "b) EFLAGS 레지스터의 AC(Alignment Check) 비트 등을 조작하여 일시적으로 SMAP 기능을 끄고 접근한 뒤 다시 켠다.",
      "c) 사용자 데이터를 커널 영역으로 복사하지 않고 직접 실행한다.",
      "d) 하이퍼바이저에게 대신 데이터를 읽어달라고 요청한다.",
      "e) SMAP는 어떠한 경우에도 사용자 영역 접근을 허용하지 않으므로 접근이 불가능하다."
    ],
    answer: 1,
    explanation: "SMAP이 켜져 있으면 커널이 사용자 데이터에 접근하는 것을 막습니다. 따라서 의도적으로 접근해야 할 때는 stac 명령어 등을 통해 일시적으로 보호 기능을 해제해야 합니다."
  },
  {
    id: 23,
    category: "Software Defense",
    question: "ROP (Return Oriented Programming) 공격에서 'Gadget(가젯)'의 필수적인 특징은 무엇인가?",
    options: [
      "a) 항상 NOP 명령어로 시작해야 한다.",
      "b) ret (Return) 명령어로 끝나는 짧은 코드 조각이어야 한다.",
      "c) 최소 100바이트 이상의 길이를 가져야 한다.",
      "d) 반드시 스택 영역에 존재해야 한다.",
      "e) 암호화되어 있어야 한다."
    ],
    answer: 1,
    explanation: "ROP 가젯은 실행 후 다음 가젯으로 제어권을 넘겨야 하므로, 반드시 스택의 주소를 꺼내어 PC에 넣는 ret 명령어로 끝나야 합니다."
  },
  {
    id: 24,
    category: "Software Defense",
    question: "공격자가 ret2text 공격을 수행하려고 한다. 이 공격이 유효한 조건은?",
    options: [
      "a) 프로그램의 코드(Text) 영역이 ASLR에 의해 랜덤화되지 않았거나(PIE 미적용), 주소를 미리 알고 있는 경우",
      "b) 스택 카나리가 활성화되어 있고 값을 모르는 경우",
      "c) NX 비트가 설정되어 텍스트 영역이 실행 불가능한 경우",
      "d) 프로그램 내에 공격자가 원하는 함수(예: secret())가 전혀 존재하지 않는 경우",
      "e) 바이너리가 정적 분석 도구에 의해 보호되고 있는 경우"
    ],
    answer: 0,
    explanation: "ret2text는 코드 영역의 함수를 재사용하는 공격입니다. PIE가 적용되지 않아 주소가 고정되어 있거나 주소를 알고 있다면 공격이 가능합니다."
  },
  {
    id: 25,
    category: "Software Defense",
    question: "'ret2ret' (Return-to-Return) 기법은 주로 어떤 상황에서 사용되는가?",
    options: [
      "a) ASLR이 모든 영역에 완벽하게 적용되었을 때",
      "b) 스택 상의 특정 포인터 변수가 쉘코드를 가리키고 있을 때, ESP(스택 포인터)를 조작하여 해당 쉘코드로 리턴시키기 위해 사용된다.",
      "c) 커널 영역으로 직접 점프하고 싶을 때",
      "d) 스택 카나리 값을 변조하지 않고 우회하고 싶을 때",
      "e) GOT 테이블을 초기화하기 위해 사용된다."
    ],
    answer: 1,
    explanation: "ret2ret은 스택에 이미 쉘코드를 가리키는 포인터가 있을 때, 'ret' 가젯을 이용해 그 포인터를 POP하여 EIP로 옮겨 실행하기 위해 사용합니다."
  },
  {
    id: 26,
    category: "Software Defense",
    question: "다음 중 'Stack Juggling' 또는 'Stack Pivoting' 공격의 목적은?",
    options: [
      "a) 스택의 크기를 무한대로 늘려 시스템을 다운시키는 것",
      "b) 스택 포인터(ESP/RSP)를 공격자가 제어하는 다른 메모리 영역(예: 힙, 다른 버퍼)으로 옮겨서, 그곳에 구성해둔 가짜 스택 프레임(ROP 체인 등)을 실행하는 것",
      "c) 여러 개의 스택을 병렬로 사용하여 연산 속도를 높이는 것",
      "d) 스택의 내용을 힙으로 복사하여 백업하는 것",
      "e) 스택 카나리 값을 추측하기 위해 스택을 섞는 것"
    ],
    answer: 1,
    explanation: "Stack Pivoting은 스택 공간이 부족하거나 제약이 있을 때, 스택 포인터를 공격자가 제어 가능한 넉넉한 영역(힙 등)으로 변경하여 ROP 체인을 실행하는 기법입니다."
  },
  {
    id: 27,
    category: "Software Defense",
    question: "32비트 x86 시스템에서 pop eax; ret 가젯의 기계어 코드가 0x58 0xc3 일 때, 이 가젯의 역할은?",
    options: [
      "a) 스택에서 값을 하나 꺼내 EAX 레지스터에 저장하고, 다음 명령(주소)으로 리턴한다.",
      "b) EAX 레지스터의 값을 스택에 넣고 프로그램을 종료한다.",
      "c) EAX 레지스터를 0으로 초기화한다.",
      "d) 함수 호출 규약을 무시하고 강제로 점프한다.",
      "e) 스택 포인터를 4바이트 감소시킨다."
    ],
    answer: 0,
    explanation: "pop eax는 스택 값을 꺼내 EAX에 넣고 ESP를 증가시키며, ret은 다음 스택 값을 꺼내 EIP로 옮겨 점프합니다. 전형적인 ROP 가젯입니다."
  },
  {
    id: 28,
    category: "Software Defense",
    question: "커널 ASLR(KASLR) 환경에서 공격자가 /proc/kallsyms 파일을 읽으려고 시도했다. 일반 사용자 권한일 때 예상되는 결과는? (최신 리눅스 커널 기준)",
    options: [
      "a) 모든 커널 심볼의 실제 주소가 그대로 보인다.",
      "b) 모든 주소가 0으로 표시되거나, 읽기 권한이 없어 접근이 거부된다.",
      "c) 커널 소스 코드가 출력된다.",
      "d) 시스템이 즉시 재부팅된다.",
      "e) 루트 패스워드를 묻는 창이 뜬다."
    ],
    answer: 1,
    explanation: "보안을 위해 최신 리눅스 커널은 일반 사용자가 /proc/kallsyms를 읽을 때 주소를 0으로 마스킹하거나 접근을 제한합니다."
  },
  {
    id: 29,
    category: "Software Defense",
    question: "'ret2pop' 기법에 대한 설명으로 가장 적절한 것은?",
    options: [
      "a) pop 명령어를 이용하여 스택에 저장된 불필요한 인자나 값을 건너뛰고(Stack Cleaning), 원하는 실행 흐름으로 유도하는 기법이다.",
      "b) pop 명령어를 무한 반복하여 스택을 고갈시키는 공격이다.",
      "c) 팝업 창을 띄우는 악성코드를 실행하는 기법이다.",
      "d) 리턴 주소를 pop 명령어로 덮어쓰는 기법이다.",
      "e) 스택 카나리 값을 pop 하여 레지스터에 저장하는 방어 기법이다."
    ],
    answer: 0,
    explanation: "함수 호출 규약에 따라 스택에 쌓여있는 인자들을 정리하거나, 스택 포인터를 이동시켜 공격자가 원하는 데이터가 리턴 주소 위치에 오도록 맞추기 위해 사용합니다."
  },
  {
    id: 30,
    category: "Software Defense",
    question: "ASLR의 엔트로피(Entropy)가 낮다는 것은 공격자에게 어떤 의미인가?",
    options: [
      "a) 공격이 불가능함을 의미한다.",
      "b) 랜덤화되는 주소의 범위가 좁아, 무차별 대입(Brute Force) 공격의 성공 확률이 높아진다.",
      "c) 보안성이 매우 높다는 것을 의미한다.",
      "d) 시스템의 성능이 저하됨을 의미한다.",
      "e) 64비트 시스템에서만 발생하는 문제이다."
    ],
    answer: 1,
    explanation: "엔트로피가 낮다는 것은 경우의 수가 적다는 뜻입니다. 따라서 무작위 대입 공격(Brute Force)의 성공 확률이 높아집니다."
  },
  {
    id: 31,
    category: "Software Defense",
    question: "다음 중 'Information Leak(정보 유출)' 취약점이 ASLR 우회에 치명적인 이유는?",
    options: [
      "a) 관리자 비밀번호를 알아낼 수 있기 때문이다.",
      "b) 실행 중인 프로세스의 메모리 맵에서 특정 모듈(라이브러리, 힙 등)의 실제 주소를 알아내면, 오프셋 계산을 통해 나머지 주소들도 모두 파악할 수 있기 때문이다.",
      "c) 데이터베이스의 내용을 덤프할 수 있기 때문이다.",
      "d) 네트워크 트래픽을 도청할 수 있기 때문이다.",
      "e) 스택 카나리 값을 무작위로 변경할 수 있기 때문이다."
    ],
    answer: 1,
    explanation: "ASLR은 모듈 전체를 통째로 이동시킵니다. 따라서 주소 하나가 유출되면 오프셋 계산을 통해 해당 모듈 내의 모든 주소를 파악하여 ASLR을 무력화할 수 있습니다."
  },
  {
    id: 32,
    category: "Software Defense",
    question: "checksec 도구를 사용하여 바이너리를 분석했을 때 No PIE 라고 출력되었다. 이것이 의미하는 보안적 약점은?",
    options: [
      "a) 스택 카나리가 없다.",
      "b) NX 비트가 설정되지 않아 스택 실행이 가능하다.",
      "c) 바이너리의 코드(Text) 영역이 항상 고정된 주소(예: 0x400000)에 로딩되어 ROP 가젯 등을 찾기 쉽다.",
      "d) GOT 테이블이 쓰기 가능하다.",
      "e) 디버깅 심볼이 포함되어 있다."
    ],
    answer: 2,
    explanation: "No PIE는 코드 영역이 랜덤화되지 않고 고정 주소에 로딩됨을 의미하며, 이는 ROP 가젯 등을 찾기 쉽게 만듭니다."
  },
  {
    id: 33,
    category: "Software Defense",
    question: "다음 코드 조각에서 발생할 수 있는 취약점과 이를 이용한 공격 기법은?\n`printf(user_input);`",
    options: [
      "a) 버퍼 오버플로우 - 스택 카나리 우회",
      "b) 포맷 스트링 버그(FSB) - 임의 메모리 읽기 및 쓰기(GOT Overwrite 등)",
      "c) 널 포인터 역참조 - 서비스 거부",
      "d) 정수 오버플로우 - 힙 덮어쓰기",
      "e) 레이스 컨디션 - 권한 상승"
    ],
    answer: 1,
    explanation: "포맷 지정자 없이 사용자 입력을 그대로 printf에 전달하면, 포맷 스트링 버그가 발생하여 메모리 릭이나 임의 쓰기가 가능해집니다."
  },
  {
    id: 34,
    category: "Software Defense",
    question: "인텔 CPU의 'XD bit'와 AMD의 'XN bit'는 무엇을 구현하기 위한 하드웨어 기능인가?",
    options: [
      "a) ASLR",
      "b) Stack Canary",
      "c) DEP (Data Execution Prevention)",
      "d) SMAP",
      "e) RELRO"
    ],
    answer: 2,
    explanation: "XD/XN 비트는 메모리 페이지에 실행 권한이 없음을 표시하는 하드웨어 기능으로, 운영체제는 이를 이용해 DEP를 구현합니다."
  },
  {
    id: 35,
    category: "Software Defense",
    question: "리눅스 커널에서 copy_from_user 함수가 호출될 때, 하드웨어적으로 SMAP이 켜져 있다면 어떤 과정이 선행되어야 하는가?",
    options: [
      "a) 페이지 테이블을 삭제한다.",
      "b) 인터럽트를 비활성화한다.",
      "c) EFLAGS 레지스터의 AC 비트를 설정하여 일시적으로 사용자 영역 접근을 허용한다. (stac 명령어 등)",
      "d) 커널 모드를 종료하고 사용자 모드로 전환한다.",
      "e) 해당 메모리 영역을 커널 영역으로 매핑을 변경한다."
    ],
    answer: 2,
    explanation: "SMAP 환경에서 사용자 데이터에 접근하려면 AC 비트를 설정하여 일시적으로 보호 기능을 해제해야 합니다."
  },
  {
    id: 36,
    category: "Software Defense",
    question: "다음 중 'Control Flow Hijacking' 공격의 예시가 아닌 것은?",
    options: [
      "a) Return Address Overwrite",
      "b) Function Pointer Overwrite",
      "c) GOT Overwrite",
      "d) SQL Injection",
      "e) Vtable Overwrite (C++ 객체)"
    ],
    answer: 3,
    explanation: "SQL Injection은 데이터베이스 쿼리를 조작하는 공격이며, 메모리 상의 실행 흐름(EIP/RIP)을 가로채는 공격은 아닙니다."
  },
  {
    id: 37,
    category: "Software Defense",
    question: "스택 카나리(Canary) 값의 첫 바이트가 주로 NULL (0x00)로 설정되는 이유는?",
    options: [
      "a) 공격자가 strcpy 등의 문자열 함수를 이용해 카나리 값을 읽거나 덮어쓰려 할 때, NULL 문자를 만나 복사/출력이 중단되도록 하기 위함이다.",
      "b) 랜덤 값을 생성하는 알고리즘의 오류이다.",
      "c) 스택의 끝을 알리는 표시이다.",
      "d) 리틀 엔디안 아키텍처의 특성 때문이다.",
      "e) 컴파일러의 최적화 과정에서 발생하는 부산물이다."
    ],
    answer: 0,
    explanation: "NULL 바이트는 문자열 함수의 종료 문자입니다. 카나리 첫 바이트가 NULL이면 문자열 기반 오버플로우 공격 시 카나리를 덮어쓰거나 읽을 때 중단되어 공격을 어렵게 합니다."
  },
  {
    id: 38,
    category: "Software Defense",
    question: "공격자가 system(\"/bin/sh\")를 실행하려고 하지만, 인자를 전달할 레지스터나 스택 구성이 복잡하다. 이때 유용하게 사용할 수 있는 ROP 가젯의 형태는? (단, 64비트 호출 규약 기준)",
    options: [
      "a) pop rdi; ret",
      "b) push eax; jmp esp",
      "c) mov eax, 0; int 0x80",
      "d) inc ecx; loop",
      "e) xor eax, eax; ret"
    ],
    answer: 0,
    explanation: "64비트 시스템에서는 첫 번째 인자를 RDI 레지스터로 전달합니다. system 함수의 인자 주소를 RDI에 넣으려면 pop rdi; ret 가젯이 필요합니다."
  },
  {
    id: 39,
    category: "Software Defense",
    question: "'Lazy Binding'을 하지 않고, 프로그램 시작 시점에 모든 심볼을 즉시 바인딩(Binding)하도록 강제하는 링커 옵션과 관련된 보안 기법은?",
    options: [
      "a) Canary",
      "b) NX",
      "c) PIE",
      "d) Full RELRO (-z now)",
      "e) ASLR"
    ],
    answer: 3,
    explanation: "Full RELRO (-z now)는 프로그램 로딩 시점에 모든 심볼 해석을 완료하고 GOT를 Read-Only로 만듭니다."
  },
  {
    id: 40,
    category: "Software Defense",
    question: "KASLR이 적용된 환경에서 커널 영역의 페이지 폴트 처리 시간 차이를 이용한 공격(Timing Side Channel)을 방어하기 위한 가장 근본적인 하드웨어적 대책은?",
    options: [
      "a) 커널 메모리 주소를 사용자에게 공개한다.",
      "b) 매핑되지 않은 주소 접근과 권한 위반 접근 시 발생하는 처리 시간(Cycle)을 동일하게 맞추거나, TSX 같은 기능을 수정/비활성화한다.",
      "c) 페이지 테이블의 구조를 3단계로 줄인다.",
      "d) 모든 커널 함수를 인라인(Inline) 함수로 만든다.",
      "e) 커널을 32비트 모드로 동작시킨다."
    ],
    answer: 1,
    explanation: "Timing Side Channel을 막으려면 유효/무효 주소 접근 시의 하드웨어적 처리 시간을 동일하게 맞추거나, 정밀한 시간 측정을 가능하게 하는 기능(TSX)을 제한해야 합니다."
  },
  {
    id: 41,
    category: "Software Defense",
    question: "다음 중 'MITIGATION' (완화 기법)의 범주에 들어가는 것으로 짝지어진 것은?",
    options: [
      "a) Code Review, Fuzzing",
      "b) Stack Canary, DEP, ASLR",
      "c) Debugging, Patching",
      "d) Penetration Testing, Risk Analysis",
      "e) IDS, Firewall"
    ],
    answer: 1,
    explanation: "Mitigation은 취약점이 있어도 익스플로잇을 어렵게 만드는 기술입니다. Stack Canary, DEP, ASLR이 대표적입니다."
  },
  {
    id: 42,
    category: "Software Defense",
    question: "ret2text 공격 시나리오에서 main 함수가 secret 함수를 호출하지 않음에도 불구하고, 공격자가 secret 함수를 실행할 수 있는 이유는?",
    options: [
      "a) secret 함수가 public으로 선언되었기 때문이다.",
      "b) secret 함수의 코드는 메모리(Text 세그먼트)에 적재되어 있고, 공격자가 리턴 주소를 secret 함수의 주소로 변조했기 때문이다.",
      "c) 운영체제가 자동으로 secret 함수를 실행하기 때문이다.",
      "d) 컴파일러가 secret 함수를 main 함수 내부에 인라인으로 포함시켰기 때문이다.",
      "e) secret 함수가 스택 영역에 복사되었기 때문이다."
    ],
    answer: 1,
    explanation: "호출되지 않아도 컴파일된 바이너리에는 코드가 포함되어 있습니다. 리턴 주소를 변조하여 해당 코드 위치로 점프하면 실행할 수 있습니다."
  },
  {
    id: 43,
    category: "Software Defense",
    question: "ASLR 환경에서 라이브러리(libc)의 베이스 주소를 구하는 공식으로 적절한 것은?",
    options: [
      "a) Base_Address = Leak_Address_of_Function - Offset_of_Function",
      "b) Base_Address = Offset_of_Function + Stack_Address",
      "c) Base_Address = Heap_Address * 2",
      "d) Base_Address = Canary_Value ^ Mask",
      "e) Base_Address = 0x400000 (고정)"
    ],
    answer: 0,
    explanation: "실제 로딩된 주소(Leak)에서 파일 내 오프셋을 빼면 베이스 주소를 구할 수 있습니다."
  },
  {
    id: 44,
    category: "Software Defense",
    question: "스택 버퍼 오버플로우가 발생했지만 리턴 주소(Return Address)까지 도달하지 못하고, 지역 변수 포인터 ptr만 덮어쓸 수 있는 상황이다. 이때 가능한 공격 시나리오는?",
    options: [
      "a) 공격 불가능하다.",
      "b) ptr을 GOT 주소 등으로 변조하고, 이후 해당 ptr을 이용한 쓰기 작업(strcpy(ptr, ...) 등)을 통해 간접적으로 제어 흐름을 탈취한다.",
      "c) 카나리 값을 직접 수정한다.",
      "d) 커널 영역의 코드를 패치한다.",
      "e) ASLR 설정을 끈다."
    ],
    answer: 1,
    explanation: "중요 데이터 포인터(ptr)를 변조하여 이후의 쓰기 작업에서 원하는 위치(GOT 등)에 값을 쓰게 만들어 제어 흐름을 탈취할 수 있습니다."
  },
  {
    id: 45,
    category: "Software Defense",
    question: "다음 중 'Code Reuse Attack(코드 재사용 공격)'에 해당하지 않는 것은?",
    options: [
      "a) Return-to-Libc (RTL)",
      "b) Return Oriented Programming (ROP)",
      "c) Shellcode Injection (스택에 직접 코드를 쓰고 실행)",
      "d) Jump Oriented Programming (JOP)",
      "e) ret2text"
    ],
    answer: 2,
    explanation: "Shellcode Injection은 새로운 코드를 주입하여 실행하는 방식이므로, 기존 코드를 재사용하는 Code Reuse Attack이 아닙니다."
  },
  {
    id: 46,
    category: "Software Defense",
    question: "64비트 리눅스 시스템에서 ASLR의 엔트로피가 32비트 시스템보다 훨씬 높은 근본적인 이유는?",
    options: [
      "a) 64비트 CPU가 더 빠르기 때문이다.",
      "b) 사용할 수 있는 가상 메모리 주소 공간(Address Space)이 훨씬 광대하여, 랜덤하게 배치할 수 있는 경우의 수가 기하급수적으로 늘어났기 때문이다.",
      "c) 64비트 시스템은 보안 전용 칩셋을 사용하기 때문이다.",
      "d) 64비트에서는 스택을 사용하지 않기 때문이다.",
      "e) 커널 버전이 더 높기 때문이다."
    ],
    answer: 1,
    explanation: "64비트는 주소 공간이 매우 넓어 스택, 힙, 라이브러리를 배치할 수 있는 경우의 수가 천문학적으로 늘어나 추측 공격이 매우 어렵습니다."
  },
  {
    id: 47,
    category: "Software Defense",
    question: "'Privilege Escalation(권한 상승)' 공격의 최종 목표로 가장 적절한 것은?",
    options: [
      "a) 게스트 계정으로 로그인하기",
      "b) 현재 프로세스의 권한을 Root(또는 System) 권한으로 격상시키기 (예: commit_creds(prepare_kernel_cred(0)))",
      "c) 화면 보호기 실행하기",
      "d) 웹 브라우저 캐시 삭제하기",
      "e) 프린터 스풀러 중지하기"
    ],
    answer: 1,
    explanation: "권한 상승의 목표는 낮은 권한의 프로세스가 시스템 최고 권한(Root)을 획득하는 것입니다."
  },
  {
    id: 48,
    category: "Software Defense",
    question: "하드웨어 기반의 보안 기능인 'Intel MPX'나 'ARM PAC' 등이 등장하는 기술적 배경은?",
    options: [
      "a) 소프트웨어 기반 방어 기법(Canary 등)만으로는 오버헤드나 우회 가능성 문제가 있어, 하드웨어 레벨에서 포인터 무결성이나 메모리 경계를 검증하기 위함이다.",
      "b) CPU의 클럭 속도를 높이기 위함이다.",
      "c) 가상 화폐 채굴 성능을 높이기 위함이다.",
      "d) 레거시 16비트 프로그램을 지원하기 위함이다.",
      "e) 운영체제의 설치 용량을 줄이기 위함이다."
    ],
    answer: 0,
    explanation: "소프트웨어 방어의 한계(오버헤드, 우회)를 극복하기 위해 하드웨어 차원에서 무결성을 검증하는 기술들이 도입되었습니다."
  },
  {
    id: 49,
    category: "Software Defense",
    question: "다음 중 버퍼 오버플로우 취약점을 근본적으로 제거하기 위한 'Software Defense'의 가장 기초적인 단계는?",
    options: [
      "a) 백신 프로그램 설치",
      "b) 방화벽 설정",
      "c) 시큐어 코딩(Secure Coding) - strcpy, gets 등의 불안전한 함수 사용을 지양하고 strncpy, fgets 등을 사용하며 경계 검사(Boundary Check)를 수행한다.",
      "d) 주기적인 재부팅",
      "e) 사용자 교육"
    ],
    answer: 2,
    explanation: "가장 근본적인 방어는 시큐어 코딩을 통해 버퍼 오버플로우 취약점 자체를 만들지 않는 것입니다."
  },
  {
    id: 50,
    category: "Software Defense",
    question: "최신 보안 방어 기법의 발전 양상(Arms Race)에 대한 설명으로 가장 적절한 것은?",
    options: [
      "a) 방어 기법이 완벽해져서 더 이상 새로운 공격 기법은 나오지 않고 있다.",
      "b) 공격 기법 하나가 나오면 그에 대응하는 방어 기법이 나오고, 이를 우회하는 또 다른 공격 기법이 등장하며 상호 발전하고 있다.",
      "c) 하드웨어 성능의 한계로 인해 보안 기법은 점차 단순화되고 있다.",
      "d) 모든 보안 책임은 사용자에게 전가되고 있다.",
      "e) AI가 모든 보안 패치를 자동으로 수행하므로 개발자는 보안에 신경 쓸 필요가 없다."
    ],
    answer: 1,
    explanation: "보안은 창과 방패의 대결처럼 공격과 방어가 서로를 발전시키는 형태로 진행되고 있습니다. (BOF -> Canary/DEP -> ROP -> ASLR ...)"
  }
];

// --- 컴포넌트 구현 ---

export default function QuizPage2() {
  return (
    <QuizTemplate 
      title="소프트웨어 및 시스템 보안" 
      subtitle="Software Defense"
      quizData={questions} 
    />
  );
}