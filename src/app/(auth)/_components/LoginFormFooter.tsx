import Link from "next/link";

interface LoginFormFooterProps {
  links?: Array<{
    href: string;
    label: string;
  }>;
  copyrightYear?: string;
  companyName?: string;
}

const LoginFormFooter = ({
  links = [
    { href: "#", label: "카카오톡 상담하기" },
    { href: "#", label: "고객센터 안내" },
  ],
}: LoginFormFooterProps) => {
  return (
    <footer className="flex justify-center text-sm text-gray-500">
      {links.map((link, index) => (
        <div key={index} className="flex items-center">
          <Link href={link.href} className="hover:text-gray-700">
            {link.label}
          </Link>
          {/* 구분선 */}
          {index < links.length - 1 && <div className="mx-2xs h-4 w-px bg-gray-300"></div>}
        </div>
      ))}
    </footer>
  );
};

export default LoginFormFooter;
