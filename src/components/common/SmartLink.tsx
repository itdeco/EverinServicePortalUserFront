import Link from "next/link"
import { ReactNode } from "react"
import { ExternalLink } from "lucide-react"

type SmartLinkProps = {
    href: string
    children: ReactNode
    className?: string
    onClick?: () => void
    external?: boolean
}

export default function SmartLink({
                                      href,
                                      children,
                                      className,
                                      onClick,
                                      external,
                                  }: SmartLinkProps) {
    const isExternal =
        external ||
        href.startsWith("http://") ||
        href.startsWith("https://")

    if (isExternal) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group inline-flex items-center gap-1 ${className}`}
                onClick={onClick}
            >
                {children}

                {/*hover 시 아이콘 */}
                <ExternalLink className="h-3 w-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </a>
        )
    }

    return (
        <Link href={href} className={className} onClick={onClick}>
            {children}
        </Link>
    )
}