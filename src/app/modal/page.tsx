"use client";

import { useState } from "react";

import { AlertModal } from "@/components/ui/Modal/AlertModal";
import { BaseModal } from "@/components/ui/Modal/BaseModal";
import { ConfirmModal } from "@/components/ui/Modal/ConfirmModal";
import { FormModal } from "@/components/ui/Modal/FormModal";

export default function ModalPage() {
  const [baseModalOpen, setBaseModalOpen] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = () => {
    // 확인 로직
    console.log("확인됨!");
    setAlertModalOpen(true); // 확인 후 알림 모달 표시
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 폼 데이터 처리 예시
      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());

      // API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("폼 데이터:", data);

      setFormModalOpen(false);
      setAlertModalOpen(true); // 성공 알림
    } catch (error) {
      console.error("에러:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 p-8">
      <section className="space-y-4">
        <h2 className="text-xl font-bold">기본 모달</h2>
        <button
          onClick={() => setBaseModalOpen(true)}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          기본 모달 열기
        </button>
        <BaseModal
          isOpen={baseModalOpen}
          onClose={() => setBaseModalOpen(false)}
          title="기본 모달"
          size="md"
          positiveButton={{
            text: "확인",
            onClick: () => setBaseModalOpen(false),
          }}
          negativeButton={{
            text: "닫기",
            onClick: () => setBaseModalOpen(false),
          }}
        >
          <p className="text-gray-600">
            기본 모달입니다. 제목, 내용, 버튼을 모두 커스터마이징할 수 있습니다.
          </p>
        </BaseModal>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">알림 모달</h2>
        <button
          onClick={() => setAlertModalOpen(true)}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          알림 모달 열기
        </button>
        <AlertModal
          isOpen={alertModalOpen}
          onClose={() => setAlertModalOpen(false)}
          title="알림"
          message="작업이 성공적으로 완료되었습니다!"
          confirmText="확인"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">확인 모달</h2>
        <button
          onClick={() => setConfirmModalOpen(true)}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          확인 모달 열기
        </button>
        <ConfirmModal
          isOpen={confirmModalOpen}
          onClose={() => setConfirmModalOpen(false)}
          onConfirm={handleConfirm}
          title="삭제 확인"
          message="정말 이 항목을 삭제하시겠습니까?"
          confirmText="삭제"
          cancelText="취소"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">폼 모달</h2>
        <button
          onClick={() => setFormModalOpen(true)}
          className="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
        >
          폼 모달 열기
        </button>
        <FormModal
          isOpen={formModalOpen}
          onClose={() => setFormModalOpen(false)}
          onSubmit={handleSubmit}
          title="사용자 정보 입력"
          submitText="저장"
          isSubmitting={isSubmitting}
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                이름
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                이메일
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </FormModal>
      </section>

      <div className="mt-8 rounded bg-gray-100 p-4">
        <h3 className="mb-2 font-bold">모달 타입별 특징:</h3>
        <ul className="list-disc space-y-2 pl-5">
          <li>기본 모달: 가장 유연한 커스터마이징 가능</li>
          <li>알림 모달: 단순 메시지 표시, 확인 버튼만 존재</li>
          <li>확인 모달: 사용자 확인이 필요한 중요 작업에 사용</li>
          <li>폼 모달: 데이터 입력/수정 시 사용, 폼 제출 처리 내장</li>
        </ul>
      </div>
    </div>
  );
}
