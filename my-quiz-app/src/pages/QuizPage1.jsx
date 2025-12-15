import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle, XCircle, AlertCircle, RefreshCw, Award, ChevronRight, ChevronLeft } from 'lucide-react';
import QuizTemplate from './QuizTemplate'; // 위에서 만든 파일 경로

const quizData = [
  {
    id: 1,
    category: "asd",
    question: "운영체제(OS) 커널의 핵심 기능으로 올바르지 않은 것은?",
    options: [
      "a) 프로세스 스케줄링 및 관리",
      "b) 메모리 할당 및 회수",
      "c) 시스템 콜 인터페이스 제공",
      "d) 사용자의 웹 브라우징 기록 관리",
      "e) 디바이스 드라이버 관리"
    ],
    answer: 3,
    explanation: "운영체제(OS)는 자원 관리자로서 프로세스, 메모리, I/O 디바이스 등을 관리합니다. 사용자의 웹 브라우징 기록 관리는 OS 커널의 기능이 아니라 애플리케이션 레벨의 기능입니다."
  },
  {
    id: 2,
    category: "asd",
    question: "사용자 애플리케이션이 OS 커널의 기능을 요청하기 위해 사용하는 인터페이스는 무엇인가?",
    options: [
      "a) API Hooking",
      "b) System Call",
      "c) Buffer Overflow",
      "d) DMA (Direct Memory Access)",
      "e) Context Switch"
    ],
    answer: 1,
    explanation: "사용자 애플리케이션이 OS의 서비스(I/O, 메모리 할당 등)를 요청할 때 사용하는 인터페이스는 시스템 콜(System Call)입니다."
  },
  {
    id: 3,
    category: "asd",
    question: "x86 시스템에서 시스템 콜을 호출할 때 사용하는 어셈블리 명령어는?",
    options: [
      "a) jmp 0x80",
      "b) call 0x80",
      "c) int 0x80",
      "d) mov 0x80",
      "e) ret 0x80"
    ],
    answer: 2,
    explanation: "x86 시스템에서 시스템 콜을 호출하기 위해 int 0x80 명령어를 사용하여 인터럽트를 발생시킵니다."
  },
  {
    id: 4,
    category: "asd",
    question: "듀얼 모드(Dual-mode) 동작에서 커널 모드와 유저 모드를 구분하기 위해 하드웨어가 제공하는 것은?",
    options: [
      "a) Mode bit",
      "b) Stack Pointer",
      "c) Program Counter",
      "d) GOT (Global Offset Table)",
      "e) Page Table"
    ],
    answer: 0,
    explanation: "하드웨어는 Mode bit를 제공하여 현재 실행 중인 코드가 유저 모드인지 커널 모드인지 구분합니다."
  },
  {
    id: 5,
    category: "asd",
    question: "리눅스 프로세스 메모리 구조에서, 일반적으로 가장 낮은 주소부터 높은 주소 순서로 배치되는 순서는?",
    options: [
      "a) Stack - Heap - Data - Text",
      "b) Text - Data - Heap - Stack",
      "c) Heap - Stack - Text - Data",
      "d) Data - Text - Stack - Heap",
      "e) Text - Stack - Heap - Data"
    ],
    answer: 1,
    explanation: "프로세스의 가상 메모리 레이아웃은 일반적으로 낮은 주소부터 Text(Code) -> Data -> Heap -> Stack 순서로 배치됩니다. 스택은 높은 주소에서 낮은 주소로 자라납니다."
  },
  {
    id: 6,
    category: "asd",
    question: "프로세스 제어 블록(PCB)에 저장되는 정보가 아닌 것은?",
    options: [
      "a) 프로세스 ID (PID)",
      "b) 프로세스 상태 (State)",
      "c) 레지스터 값 (Context)",
      "d) 소스 코드 파일의 전체 내용",
      "e) 스케줄링 정보"
    ],
    answer: 3,
    explanation: "PCB(Process Control Block)는 프로세스 ID, 상태, 레지스터 값(Context), 스케줄링 정보 등을 저장합니다. 소스 코드 파일 자체는 PCB에 저장되지 않습니다."
  },
  {
    id: 7,
    category: "asd",
    question: "32비트 x86 리눅스 시스템에서 가상 메모리 공간(4GB) 중 커널이 사용하는 영역의 크기는 일반적으로 얼마인가?",
    options: [
      "a) 512MB",
      "b) 1GB",
      "c) 2GB",
      "d) 3GB",
      "e) 4GB"
    ],
    answer: 1,
    explanation: "32비트 리눅스 시스템(4GB 주소 공간)에서 하위 3GB는 유저 영역, 상위 1GB는 커널 영역으로 할당됩니다."
  },
  {
    id: 8,
    category: "asd",
    question: "가상 주소를 물리 주소로 변환(Address Translation)하는 하드웨어 메커니즘은?",
    options: [
      "a) DMA",
      "b) Paging",
      "c) Segmentation Fault",
      "d) Polling",
      "e) Hooking"
    ],
    answer: 1,
    explanation: "가상 주소를 물리 주소로 변환하는 메커니즘은 페이징(Paging)이며, 페이지 테이블을 참조하여 수행됩니다."
  },
  {
    id: 9,
    category: "asd",
    question: "페이지 테이블 엔트리(PTE)의 속성 비트 중, 해당 페이지에 쓰기 권한이 있는지를 나타내는 것은?",
    options: [
      "a) P (Present)",
      "b) U/S (User/Supervisor)",
      "c) R/W (Read/Write)",
      "d) A (Accessed)",
      "e) D (Dirty)"
    ],
    answer: 2,
    explanation: "페이지 테이블 엔트리(PTE)의 속성 중 R/W (Read/Write) 비트는 읽기 전용인지 쓰기 가능한지를 나타냅니다."
  },
  {
    id: 10,
    category: "asd",
    question: "페이지 테이블 엔트리에서 'Supervisor bit' 또는 'U/S bit'의 주된 역할은?",
    options: [
      "a) 페이지의 존재 여부 확인",
      "b) 유저 모드에서 커널 메모리 접근 차단",
      "c) 메모리 쓰기 방지",
      "d) 실행 가능 여부 결정",
      "e) 캐시 사용 여부 결정"
    ],
    answer: 1,
    explanation: "U/S (User/Supervisor) 비트는 유저 모드에서 해당 페이지에 접근할 수 있는지(0이면 커널만 접근 가능)를 제어하여 커널 메모리를 보호합니다."
  },
  {
    id: 11,
    category: "asd",
    question: "루트킷(Rootkit)의 정의로 가장 적절한 것은?",
    options: [
      "a) 사용자 권한만 탈취하는 단순 스크립트",
      "b) OS 커널 권한을 가지고 시스템 기능을 조작하여 탐지를 회피하는 악성코드",
      "c) 네트워크 패킷을 단순히 도청만 하는 스니퍼",
      "d) 데이터베이스를 암호화하고 돈을 요구하는 랜섬웨어",
      "e) 웹 브라우저의 쿠키를 훔치는 악성코드"
    ],
    answer: 1,
    explanation: "루트킷은 OS 커널 권한을 가지고 시스템 기능을 조작하여 자신의 존재를 숨기는 악성코드(주로 디바이스 드라이버 형태)입니다."
  },
  {
    id: 12,
    category: "asd",
    question: "리눅스에서 커널 모듈(루트킷 포함)을 커널에 적재하기 위해 사용하는 명령어는?",
    options: [
      "a) lsmod",
      "b) rmmod",
      "c) insmod",
      "d) chmod",
      "e) modprobe"
    ],
    answer: 2,
    explanation: "리눅스에서 커널 모듈(드라이버)을 적재하는 명령어는 insmod입니다."
  },
  {
    id: 13,
    category: "asd",
    question: "루트킷이 자신을 숨기기 위해 주로 조작하는 대상이 아닌 것은?",
    options: [
      "a) 시스템 콜 테이블 (System Call Table)",
      "b) VFS (Virtual File System) 객체",
      "c) 프로세스 리스트 (Linked List)",
      "d) 사용자의 바탕화면 배경화면 파일",
      "e) IDT (Interrupt Descriptor Table)"
    ],
    answer: 3,
    explanation: "루트킷은 탐지를 피하기 위해 시스템 콜 테이블, VFS 객체, 프로세스 링크드 리스트 등을 조작합니다. 배경화면 파일은 은닉 대상이 아닙니다."
  },
  {
    id: 14,
    category: "asd",
    question: "시스템 콜 테이블을 후킹(Hooking)했을 때 발생할 수 있는 현상은?",
    options: [
      "a) 시스템의 전원 공급이 즉시 차단된다.",
      "b) 특정 파일 삭제 요청 시 파일이 삭제되지 않고 보존될 수 있다.",
      "c) 유저 모드 애플리케이션이 커널 모드로 진입하지 못한다.",
      "d) 모든 네트워크 연결이 자동으로 끊긴다.",
      "e) CPU의 클럭 속도가 빨라진다."
    ],
    answer: 1,
    explanation: "시스템 콜 테이블을 후킹하여 unlink 함수를 변조하면, 특정 파일 삭제 요청 시 이를 가로채 파일이 삭제되지 않도록 할 수 있습니다."
  },
  {
    id: 15,
    category: "asd",
    question: "공격자가 unlink() 시스템 콜을 후킹하여 달성하고자 하는 주된 목적은 예제에서 무엇이었나?",
    options: [
      "a) 파일 생성 속도 향상",
      "b) 특정 파일(예: hack.me)이 삭제되지 않도록 보호",
      "c) 모든 파일을 강제로 삭제",
      "d) 파일의 내용을 암호화",
      "e) 파일의 접근 권한을 읽기 전용으로 변경"
    ],
    answer: 1,
    explanation: "예제에서 공격자는 hack.me 라는 파일이 삭제되지 않도록 보호하기 위해 sys_unlink를 후킹했습니다."
  },
  {
    id: 16,
    category: "asd",
    question: "VFS(Virtual File System) 후킹 시 공격자가 주로 조작하는 객체는?",
    options: [
      "a) Superblock",
      "b) I-Node (아이노드) 내의 함수 포인터",
      "c) 하드 디스크의 물리적 섹터",
      "d) 네트워크 카드 드라이버",
      "e) BIOS 설정"
    ],
    answer: 1,
    explanation: "VFS 후킹은 I-Node(아이노드) 객체 내의 파일 연산(read, write 등)을 담당하는 함수 포인터를 변조하는 방식으로 이루어집니다."
  },
  {
    id: 17,
    category: "asd",
    question: "루트킷이 네트워크 연결 정보를 숨기기 위해 후킹할 수 있는 파일 시스템 경로는?",
    options: [
      "a) /etc/passwd",
      "b) /proc/cpuinfo",
      "c) /proc/net/tcp",
      "d) /var/log/syslog",
      "e) /home/user/download"
    ],
    answer: 2,
    explanation: "네트워크 연결 정보(netstat 결과 등)를 숨기기 위해 루트킷은 /proc/net/tcp 파일에 대한 접근을 후킹할 수 있습니다."
  },
  {
    id: 18,
    category: "asd",
    question: "리눅스에서 로드된 모듈 목록을 보여주는 lsmod 명령어의 결과를 조작하여 루트킷을 숨기는 방법은?",
    options: [
      "a) 모듈 파일 자체를 삭제한다.",
      "b) 커널 메모리 내의 모듈 링크드 리스트(Linked List)에서 해당 모듈을 연결 해제(unlink)한다.",
      "c) lsmod 실행 파일의 이름을 변경한다.",
      "d) 모니터의 화면을 끈다.",
      "e) 시스템을 재부팅한다."
    ],
    answer: 1,
    explanation: "lsmod 명령어가 참조하는 커널 메모리 내의 모듈 링크드 리스트(Linked List)에서 자신을 연결 해제(unlink)하여 목록에서 보이지 않게 합니다."
  },
  {
    id: 19,
    category: "asd",
    question: "안드로이드 루트킷 시연에서 'Pharming(파밍)' 공격의 원리는?",
    options: [
      "a) 스마트폰의 GPS 정보를 조작한다.",
      "b) DNS 응답 패킷을 조작하여 가짜 사이트(예: 가짜 네이버)로 유도한다.",
      "c) 사용자의 지문 정보를 복제한다.",
      "d) 배터리 소모를 빠르게 한다.",
      "e) 화면 터치를 불가능하게 만든다."
    ],
    answer: 1,
    explanation: "안드로이드 루트킷 시연에서 파밍은 DNS 응답 패킷을 조작하여 사용자가 정상 URL을 입력해도 가짜 사이트로 접속되게 하는 방식이었습니다."
  },
  {
    id: 20,
    category: "asd",
    question: "DNS 스푸핑 공격을 방지하기 위한 대책으로 언급된 것은?",
    options: [
      "a) 더 큰 용량의 배터리 사용",
      "b) 네트워크 트래픽 암호화 (Network Encryption)",
      "c) 화면 밝기 조절",
      "d) 키보드 보안 프로그램 설치",
      "e) 루팅(Rooting) 수행"
    ],
    answer: 1,
    explanation: "DNS 스푸핑이나 패킷 감청을 방지하기 위한 대책으로 네트워크 암호화(Encryption)가 언급되었습니다."
  },
  {
    id: 21,
    category: "asd",
    question: "다음 중 ARM 아키텍처의 프로필(Profile) 종류가 아닌 것은?",
    options: [
      "a) Cortex-A (Application)",
      "b) Cortex-R (Real-time)",
      "c) Cortex-M (Microcontroller)",
      "d) Cortex-S (Server)",
      "e) 위 보기 중 없음 (A, R, M이 주요 프로필임)"
    ],
    answer: 3,
    explanation: "ARM 아키텍처 프로필은 Cortex-A (Application), Cortex-R (Real-time), Cortex-M (Microcontroller) 세 가지입니다. S 시리즈는 없습니다."
  },
  {
    id: 22,
    category: "asd",
    question: "ARM 프로세서가 주로 사용되는 기기가 아닌 것은?",
    options: [
      "a) 스마트폰",
      "b) IoT 디바이스",
      "c) 스마트 워치",
      "d) 고성능 x86 게이밍 데스크탑",
      "e) 자동차 임베디드 시스템"
    ],
    answer: 3,
    explanation: "ARM 프로세서는 저전력 특징으로 인해 스마트폰, IoT 등에 주로 쓰이며, 고성능 게이밍 데스크탑은 주로 x86(Intel/AMD) 계열을 사용합니다."
  },
  {
    id: 23,
    category: "asd",
    question: "ARMv8-A 아키텍처(AArch64)에서 가장 권한이 낮은(Least Privileged) 예외 레벨은?",
    options: [
      "a) EL0",
      "b) EL1",
      "c) EL2",
      "d) EL3",
      "e) EL4"
    ],
    answer: 0,
    explanation: "ARMv8-A에서 EL0은 가장 낮은 권한인 유저 애플리케이션 레벨입니다. (EL3가 가장 높음)."
  },
  {
    id: 24,
    category: "asd",
    question: "ARMv8-A에서 하이퍼바이저(Hypervisor)가 실행되는 권한 레벨은?",
    options: [
      "a) EL0",
      "b) EL1",
      "c) EL2",
      "d) EL3",
      "e) Secure Monitor"
    ],
    answer: 2,
    explanation: "하이퍼바이저(Hypervisor)는 EL2 권한 레벨에서 실행됩니다."
  },
  {
    id: 25,
    category: "asd",
    question: "ARM 아키텍처에서 'Secure World'와 'Non-Secure World'를 오가는 스위칭 역할을 하는 모드는?",
    options: [
      "a) User Mode",
      "b) Kernel Mode",
      "c) Hypervisor Mode",
      "d) Monitor Mode (EL3)",
      "e) IRQ Mode"
    ],
    answer: 3,
    explanation: "Secure World와 Non-Secure World 상태를 전환할 때 거쳐가는 모드는 Monitor Mode (EL3)입니다."
  },
  {
    id: 26,
    category: "asd",
    question: "ARM의 TrustZone 기술에 대한 설명으로 옳은 것은?",
    options: [
      "a) 메모리 용량을 두 배로 늘려주는 기술이다.",
      "b) CPU를 물리적으로 두 개 사용하여 속도를 높인다.",
      "c) 프로세서의 상태를 Secure와 Non-Secure로 나누어 보안성을 강화하는 하드웨어 아키텍처다.",
      "d) 클라우드에 데이터를 백업하는 서비스다.",
      "e) 배터리 수명을 연장하는 전력 관리 기술이다."
    ],
    answer: 2,
    explanation: "TrustZone은 프로세서의 상태를 Secure(보안)와 Non-Secure(비보안)로 나누어 하드웨어 레벨에서 보안을 지원하는 기술입니다."
  },
  {
    id: 27,
    category: "asd",
    question: "AArch64(64비트 ARM)에는 몇 개의 범용 레지스터(General Purpose Register)가 있는가?",
    options: [
      "a) 8개",
      "b) 16개",
      "c) 31개 (x0~x30)",
      "d) 64개",
      "e) 128개"
    ],
    answer: 2,
    explanation: "AArch64는 x0 부터 x30 까지 총 31개의 범용 레지스터를 제공합니다."
  },
  {
    id: 28,
    category: "asd",
    question: "AArch64에서 함수 호출 시 되돌아갈 주소(Return Address)를 저장하는 레지스터(Link Register)는 몇 번인가?",
    options: [
      "a) x0",
      "b) x8",
      "c) x16",
      "d) x29",
      "e) x30"
    ],
    answer: 4,
    explanation: "함수 호출 후 복귀할 주소(Link Register)를 저장하는 레지스터는 x30 (LR)입니다."
  },
  {
    id: 29,
    category: "asd",
    question: "AArch64 레지스터 중 x29는 주로 어떤 용도로 사용되는가?",
    options: [
      "a) Stack Pointer (SP)",
      "b) Program Counter (PC)",
      "c) Frame Pointer (FP)",
      "d) Zero Register (XZR)",
      "e) Return Value"
    ],
    answer: 2,
    explanation: "x29 레지스터는 Frame Pointer (FP)로 사용됩니다."
  },
  {
    id: 30,
    category: "asd",
    question: "x86의 EIP 또는 RIP에 해당하는, 현재 실행 중인 명령어의 주소를 담고 있는 ARM 레지스터는?",
    options: [
      "a) SP (Stack Pointer)",
      "b) LR (Link Register)",
      "c) PC (Program Counter)",
      "d) FP (Frame Pointer)",
      "e) SPSR"
    ],
    answer: 2,
    explanation: "현재 실행 중인 명령어의 주소를 담고 있는 레지스터는 PC (Program Counter)입니다."
  },
  {
    id: 31,
    category: "asd",
    question: "ARMv8-A의 가상 주소 변환에서 EL1(OS 커널)과 EL0(애플리케이션)의 주소 공간을 분리하기 위해 사용하는 두 개의 베이스 레지스터는?",
    options: [
      "a) CR0, CR3",
      "b) TTBR0_EL1, TTBR1_EL1",
      "c) VTTBR, VTCR",
      "d) CSSELR, CLIDR",
      "e) SCTLR, HCR"
    ],
    answer: 1,
    explanation: "ARMv8-A EL1(OS)에서는 유저 영역과 커널 영역의 변환 테이블을 분리하기 위해 TTBR0_EL1과 TTBR1_EL1을 사용합니다."
  },
  {
    id: 32,
    category: "asd",
    question: "일반적으로 TTBR0_EL1은 누구의 가상 주소 변환 테이블을 가리키는가?",
    options: [
      "a) 커널 영역 (상위 주소)",
      "b) 유저 애플리케이션 영역 (하위 주소)",
      "c) 하이퍼바이저 영역",
      "d) 시큐어 모니터 영역",
      "e) 디바이스 드라이버 영역"
    ],
    answer: 1,
    explanation: "TTBR0_EL1은 일반적으로 유저 애플리케이션(하위 주소) 영역의 매핑 정보를 담고 있습니다. (TTBR1은 OS 커널)."
  },
  {
    id: 33,
    category: "asd",
    question: "강의에서 언급된 'JTAG' 디버거와 'GDB'의 주요 차이점은?",
    options: [
      "a) JTAG은 소프트웨어 기반이고 GDB는 하드웨어 기반이다.",
      "b) JTAG은 하드웨어 장비를 보드에 연결하여 디버깅하고, GDB는 주로 소프트웨어적으로 디버깅한다.",
      "c) GDB가 JTAG보다 훨씬 비싸다.",
      "d) JTAG은 메모리를 볼 수 없다.",
      "e) 차이점이 없다."
    ],
    answer: 1,
    explanation: "GDB는 주로 소프트웨어 디버거이고, JTAG은 보드에 물리적으로 연결하여 하드웨어 레벨에서 제어하는 디버거입니다."
  },
  {
    id: 34,
    category: "asd",
    question: "시스템 콜 테이블의 주소나 내용을 변조하는 공격을 무엇이라고 하는가?",
    options: [
      "a) Buffer Overflow",
      "b) Control Flow Hijacking (또는 Hooking)",
      "c) Race Condition",
      "d) SQL Injection",
      "e) Cross-Site Scripting"
    ],
    answer: 1,
    explanation: "시스템 콜 테이블 등의 주소를 변조하여 실행 흐름을 바꾸는 공격을 Control Flow Hijacking (또는 Hooking)이라고 합니다."
  },
  {
    id: 35,
    category: "asd",
    question: "리눅스 /proc 파일 시스템에서 특정 프로세스의 메모리 맵핑 현황을 볼 수 있는 파일은?",
    options: [
      "a) /proc/[pid]/cmdline",
      "b) /proc/[pid]/maps",
      "c) /proc/[pid]/status",
      "d) /proc/[pid]/stat",
      "e) /proc/[pid]/mounts"
    ],
    answer: 1,
    explanation: "/proc 파일 시스템에서 프로세스의 메모리 매핑 현황을 보여주는 파일은 maps입니다."
  },
  {
    id: 36,
    category: "asd",
    question: "강의 중 언급된 삼성전자의 보안 플랫폼 이름은?",
    options: [
      "a) Galaxy Guard",
      "b) Knox (녹스)",
      "c) SafeZone",
      "d) Android Shield",
      "e) S-Security"
    ],
    answer: 1,
    explanation: "삼성전자의 모바일 보안 플랫폼 이름은 Knox(녹스)입니다."
  },
  {
    id: 37,
    category: "asd",
    question: "NX(Non-Executable) 비트의 기능은?",
    options: [
      "a) 스택이나 힙 영역에서 코드가 실행되는 것을 방지한다.",
      "b) 메모리 주소를 랜덤화한다.",
      "c) 커널 메모리에 대한 접근을 차단한다.",
      "d) 시스템 콜을 암호화한다.",
      "e) 파일 삭제를 방지한다."
    ],
    answer: 0,
    explanation: "NX(Non-Executable) 비트는 스택이나 힙 같은 데이터 영역에서 코드가 실행되는 것을 방지합니다."
  },
  {
    id: 38,
    category: "asd",
    question: "ASLR(Address Space Layout Randomization)의 목적은?",
    options: [
      "a) 메모리 사용량을 줄이기 위해",
      "b) 프로그램 실행 속도를 높이기 위해",
      "c) 공격자가 메모리상의 특정 함수나 가젯(Gadget)의 주소를 예측하기 어렵게 만들기 위해",
      "d) 디버깅을 쉽게 하기 위해",
      "e) 멀티태스킹 효율을 높이기 위해"
    ],
    answer: 2,
    explanation: "ASLR은 메모리 주소를 랜덤화하여 공격자가 코드나 가젯의 위치를 예측하여 악용하는 것을 어렵게 만듭니다."
  },
  {
    id: 39,
    category: "asd",
    question: "ARM 레지스터 중 Wn 레지스터는 Xn 레지스터의 몇 비트 하위 부분을 의미하는가?",
    options: [
      "a) 8비트",
      "b) 16비트",
      "c) 32비트",
      "d) 48비트",
      "e) 64비트"
    ],
    answer: 2,
    explanation: "64비트 레지스터 Xn의 하위 32비트 부분에 접근할 때 Wn이라는 이름을 사용합니다."
  },
  {
    id: 40,
    category: "asd",
    question: "리눅스 커널 모듈(디바이스 드라이버) 파일의 일반적인 확장자는?",
    options: [
      "a) .exe",
      "b) .sh",
      "c) .ko",
      "d) .dll",
      "e) .so"
    ],
    answer: 2,
    explanation: "리눅스 커널 모듈(Kernel Object) 파일의 확장자는 .ko입니다."
  },
  {
    id: 41,
    category: "asd",
    question: "시스템 콜 처리 과정에서 인터럽트(Trap) 발생 시 CPU의 모드 비트는 어떻게 변하는가?",
    options: [
      "a) 0에서 1로 변한다. (커널 -> 유저)",
      "b) 1에서 0으로 변한다. (유저 -> 커널)",
      "c) 변하지 않는다.",
      "d) 1에서 2로 변한다.",
      "e) 랜덤하게 변한다."
    ],
    answer: 1,
    explanation: "유저 모드(Mode bit 1)에서 트랩(시스템 콜)이 발생하면 커널 모드(Mode bit 0)로 전환되므로, 모드 비트는 1에서 0으로 변합니다."
  },
  {
    id: 42,
    category: "asd",
    question: "netstat 명령어로 네트워크 연결을 확인할 때, 루트킷이 특정 연결을 숨기기 위해 후킹하는 함수로 적절한 것은?",
    options: [
      "a) write()",
      "b) read() (특히 /proc/net/tcp 파일 읽기)",
      "c) exit()",
      "d) fork()",
      "e) malloc()"
    ],
    answer: 1,
    explanation: "netstat 은 /proc/net/tcp 파일을 읽어서 정보를 보여주므로, 루트킷은 파일 읽기 함수인 read() (또는 VFS의 read)를 후킹하여 내용을 숨깁니다."
  },
  {
    id: 43,
    category: "asd",
    question: "강의에서 언급된 \"가젯(Gadget)\"을 이용해 메모리 보호 기법(NX 등)을 우회하는 공격 기법은?",
    options: [
      "a) ROP (Return Oriented Programming)",
      "b) SQL Injection",
      "c) Phishing",
      "d) Brute Force",
      "e) DDoS"
    ],
    answer: 0,
    explanation: "NX 등의 보호 기법이 있을 때, 실행 가능한 코드 조각(Gadget)들을 연결하여 공격하는 기법은 ROP (Return Oriented Programming)입니다."
  },
  {
    id: 44,
    category: "asd",
    question: "ARM 프로세서의 예외 처리(Exception Handling) 후 복귀할 때 사용하는 명령어는?",
    options: [
      "a) RET",
      "b) IRET",
      "c) ERET",
      "d) JMP",
      "e) CALL"
    ],
    answer: 2,
    explanation: "ARM 프로세서에서 예외 처리 후 이전 상태로 복귀할 때 사용하는 명령어는 ERET입니다."
  },
  {
    id: 45,
    category: "asd",
    question: "다음 중 시스템 레벨의 보안 실습을 위해 필요한 장비나 도구로 강의에서 언급된 것은?",
    options: [
      "a) VR 헤드셋",
      "b) 하드웨어 디버거 (JTAG 등) 및 개발 보드",
      "c) 고성능 그래픽 카드",
      "d) 3D 프린터",
      "e) 드론"
    ],
    answer: 1,
    explanation: "실습을 위해 개발 보드와 이를 디버깅하기 위한 하드웨어 디버거(JTAG)가 언급되었습니다."
  },
  {
    id: 46,
    category: "asd",
    question: "커널 메모리 보호를 위해 x86에서는 Supervisor bit를 사용하고, ARM에서는 무엇을 사용하는가?",
    options: [
      "a) No-Access Bit",
      "b) Access Permission (AP) bits",
      "c) Hidden Bit",
      "d) Kernel Bit",
      "e) Lock Bit"
    ],
    answer: 1,
    explanation: "ARM에서는 페이지 테이블 엔트리의 Access Permission (AP) 비트를 사용하여 커널/유저 접근 권한을 제어합니다."
  },
  {
    id: 47,
    category: "asd",
    question: "insmod 명령어를 수행했을 때 내부적으로 호출되는 시스템 콜은?",
    options: [
      "a) sys_read",
      "b) sys_write",
      "c) init_module",
      "d) sys_exit",
      "e) sys_open"
    ],
    answer: 2,
    explanation: "insmod 명령어로 모듈을 로드할 때 호출되는 시스템 콜은 init_module입니다."
  },
  {
    id: 48,
    category: "asd",
    question: "커널이 프로세스 간의 메모리를 격리(Isolation)하는 주된 이유는?",
    options: [
      "a) 메모리 절약을 위해",
      "b) 하나의 프로세스가 다른 프로세스의 메모리나 커널 메모리를 침범하지 못하게 하기 위해",
      "c) 프로세스 통신 속도를 높이기 위해",
      "d) 하드웨어 수명을 연장하기 위해",
      "e) 운영체제 설치 용량을 줄이기 위해"
    ],
    answer: 1,
    explanation: "프로세스 격리(Isolation)의 목적은 서로 다른 프로세스나 유저 프로세스가 커널 영역을 침범하거나 간섭하지 못하게 하여 시스템 안정성과 보안을 유지하는 것입니다."
  },
  {
    id: 49,
    category: "asd",
    question: "ARMv8에서 EL3 (Monitor) 모드는 주로 어떤 상태 전환을 관리하는가?",
    options: [
      "a) User <-> Kernel",
      "b) 32bit <-> 64bit",
      "c) Secure World <-> Non-Secure World",
      "d) Sleep <-> Wake",
      "e) Offline <-> Online"
    ],
    answer: 2,
    explanation: "EL3(Monitor) 모드는 Secure World와 Non-Secure World 사이의 상태 전환(Switching)을 관리합니다."
  },
  {
    id: 50,
    category: "asd",
    question: "강의에서 언급된 strace 도구의 역할은?",
    options: [
      "a) 네트워크 패킷을 분석한다.",
      "b) 실행 중인 프로세스가 호출하는 시스템 콜을 추적(Trace)한다.",
      "c) 바이러스 검사를 수행한다.",
      "d) 하드 디스크의 배드 섹터를 검사한다.",
      "e) 소스 코드를 컴파일한다."
    ],
    answer: 1,
    explanation: "strace 도구는 실행 중인 프로세스가 호출하는 시스템 콜을 추적(Trace)하는 역할을 합니다."
  }
];

// --- 컴포넌트 ---

export default function QuizPage1() {
  return (
    <QuizTemplate 
      title="소프트웨어 및 시스템 보안" 
      subtitle="Kernel"
      quizData={quizData} 
    />
  );
}