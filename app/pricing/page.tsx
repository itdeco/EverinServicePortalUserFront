'use client'

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import {useEffect, useState} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import {useLoginStatus} from '@/redux/selectors/Users'
import {Api} from '@/api'
import {checkApiResult} from '@/utils/apiUtil'
import {PlanDto} from '@/types/Plans'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Badge} from '@/components/ui/badge'
import {Check, X, Gift, Zap, Settings, ArrowRight} from 'lucide-react'

export default function PricePage() {
    const router = useRouter()
    const isLoggedIn = useLoginStatus()

    const [plans, setPlans] = useState<PlanDto[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const loadPlans = async () => {
        try {
            const result = await Api.Plans.getAllPlans()
            if (checkApiResult(result)) {
                setPlans(result!.payload || [])
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubscribe = (planId: number) => {
        if (isLoggedIn) {
            router.push('/subscribe')
        } else {
            router.push('/signup')
        }
    }

    const handleInquiry = () => {
        router.push('/support/inquiry/write')
    }

    useEffect(() => {
        loadPlans()
    }, [])

    const features = [
        {name: '출근부', basic: true, enterprise: true},
        {name: '근태신청', basic: true, enterprise: true},
        {name: '근태기준관리', basic: false, enterprise: true},
        {name: '근태운영설정', basic: false, enterprise: true},
        {name: '근무시간 템플릿관리', basic: true, enterprise: true},
        {name: '근무유형관리', basic: true, enterprise: true},
        {name: '연차기준등록', basic: true, enterprise: true},
        {name: '보상휴가기준', basic: false, enterprise: true},
        {name: '조직관리', basic: true, enterprise: true},
        {name: '근태신청관리', basic: false, enterprise: true},
        {name: '휴가', basic: true, enterprise: true},
        {name: '부재', basic: false, enterprise: true},
    ]

    return (
        <main className="min-h-screen bg-background">
            <Header/>

            <div className="bg-gradient-to-b from-background to-primary/5">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-primary/80 py-16 text-white">
                    <div className="container max-w-7xl mx-auto px-4 text-center">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Zap className="h-8 w-8"/>
                            <h1 className="text-4xl md:text-5xl font-bold">요금제</h1>
                        </div>
                        <p className="text-white/90 text-lg max-w-2xl mx-auto">
                            고객사의 필요에 맞게 근태관리 솔루션을 합리적인 비용으로 시작하세요
                        </p>
                    </div>
                </div>

                {/* Plans Section */}
                <div className="container max-w-7xl mx-auto px-4 py-16">
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {/* Basic Plan */}
                        <Card className="relative border-2 hover:border-primary/50 transition-all">
                            <div className="absolute -top-4 left-4">
                                <Badge className="bg-green-500">기본 플랜</Badge>
                            </div>
                            <CardHeader className="pt-8">
                                <CardTitle className="text-2xl">에버타임 Basic</CardTitle>
                                <CardDescription>클라우드 기반의 근태관리 서비스</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Pricing */}
                                <div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-bold text-foreground">2,000원</span>
                                        <span className="text-muted-foreground">/ 1인, 월기준</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        기본요금 20,000원 / 10인
                                    </p>
                                </div>

                                {/* Promotion Badge */}
                                <div
                                    className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                                    <Gift className="h-5 w-5 text-green-600"/>
                                    <span className="text-sm font-semibold text-green-900">
                  6개월 무료 사용 이벤트
                </span>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-muted-foreground">
                                    중소기업이나 소규모 조직에 적합한 간단한 근태 솔루션. 기본적인 출퇴근 기록, 휴가신청 등의 기능을 제공하며 기업 내 인사 담당자가 쉽고 빠르게
                                    근태설정 및 관리할 수 있습니다.
                                </p>

                                {/* CTA Button */}
                                <Button
                                    onClick={() => handleSubscribe(1)}
                                    className="w-full h-12 text-lg font-semibold gap-2"
                                >
                                    6개월 무료 시작하기
                                    <ArrowRight className="h-5 w-5"/>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Enterprise Plan */}
                        <Card className="relative border-2 border-primary shadow-lg">
                            <div className="absolute -top-4 left-4">
                                <Badge className="bg-primary">엔터프라이즈</Badge>
                            </div>
                            <CardHeader className="pt-8 bg-primary/5">
                                <CardTitle className="text-2xl">에버타임 Enterprise</CardTitle>
                                <CardDescription>엔터프라이즈 수준 맞춤형 솔루션</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Pricing */}
                                <div>
                                    <p className="text-lg font-semibold text-foreground">
                                        맞춤형 견적
                                    </p>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        조직 규모와 요구사항에 따른 맞춤 가격
                                    </p>
                                </div>

                                {/* Target Info */}
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                    <p className="text-sm font-semibold text-blue-900">
                                        30명 이상 사업장 권장
                                    </p>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-muted-foreground">
                                    조직 내 복잡한 구조와 다양한 근태환경에 대응. 회사 고유의 업무를 위한 커스터마이징 가능하며 급여, ERP 등과 데이터 일관성 유지를 위한 연동이
                                    기능을 제공합니다.
                                </p>

                                {/* CTA Button */}
                                <Button
                                    onClick={handleInquiry}
                                    variant="outline"
                                    className="w-full h-12 text-lg font-semibold gap-2 border-primary text-primary hover:bg-primary/10"
                                >
                                    도입문의
                                    <Settings className="h-5 w-5"/>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Features Comparison */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">기능 비교</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                <tr className="border-b-2 border-primary">
                                    <th className="text-left py-4 px-4 font-semibold text-foreground">기능</th>
                                    <th className="text-center py-4 px-4 font-semibold text-foreground">
                                        <div className="flex items-center justify-center gap-2">
                                            <span>Basic</span>
                                        </div>
                                    </th>
                                    <th className="text-center py-4 px-4 font-semibold text-primary">
                                        <div className="flex items-center justify-center gap-2">
                                            <span>Enterprise</span>
                                        </div>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {features.map((feature, index) => (
                                    <tr key={index}
                                        className="border-b border-border hover:bg-muted/50 transition-colors">
                                        <td className="py-4 px-4 text-foreground">{feature.name}</td>
                                        <td className="py-4 px-4 text-center">
                                            {feature.basic ? (
                                                <Check className="h-5 w-5 text-green-500 mx-auto"/>
                                            ) : (
                                                <X className="h-5 w-5 text-muted-foreground mx-auto"/>
                                            )}
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            {feature.enterprise ? (
                                                <Check className="h-5 w-5 text-primary mx-auto"/>
                                            ) : (
                                                <X className="h-5 w-5 text-muted-foreground mx-auto"/>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <Card className="bg-muted/50">
                        <CardHeader>
                            <CardTitle>자주 묻는 질문</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-foreground mb-2">언제부터 요금이 부과되나요?</h4>
                                <p className="text-sm text-muted-foreground">
                                    무료 체험 기간이 종료된 후 구독을 계속 진행하실 경우에만 요금이 부과됩니다.
                                </p>
                            </div>
                            <div className="border-t pt-4">
                                <h4 className="font-semibold text-foreground mb-2">계획 변경이 가능한가요?</h4>
                                <p className="text-sm text-muted-foreground">
                                    언제든지 계획을 변경하거나 취소할 수 있습니다. 변경 시점부터 새로운 요금이 적용됩니다.
                                </p>
                            </div>
                            <div className="border-t pt-4">
                                <h4 className="font-semibold text-foreground mb-2">엔터프라이즈 플랜에 대해 더 알고 싶어요</h4>
                                <p className="text-sm text-muted-foreground">
                                    전문가 상담팀이 귀사의 요구사항에 맞는 솔루션을 제안해드립니다.
                                </p>
                                <Link href="/support/inquiry/write">
                                    <Button variant="link" className="mt-2 p-0 h-auto">
                                        상담 신청하기 →
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Home Link */}
                    <div className="mt-12 text-center">
                        <Link href="/">
                            <Button variant="outline">홈으로 돌아가기</Button>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer/>
        </main>
    )
}
