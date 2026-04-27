'use client'

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import {useLoginStatus} from '@/redux/selectors/Users'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Badge} from '@/components/ui/badge'
import {Users, Mail, Phone, MapPin, ExternalLink, CheckCircle, ArrowRight} from 'lucide-react'

interface Partner {
    id: number
    name: string
    contact: string
    phone: string
    address: string
    website: string
}

const partners: Partner[] = [
    {
        id: 1,
        name: '바른솔텍',
        contact: '박전성',
        phone: '02-2666-1874',
        address: '서울특별시 금천구 가산디지털2로 144 1418호(가산동, 현대테라타워 가산DK)',
        website: 'http://barunsoltek.com',
    },
    {
        id: 2,
        name: '핀팀페이(by 회계법인 호안)',
        contact: '박경민 회계사',
        phone: '02-6953-6783',
        address: '서울시 송파구 올림픽로 102, 서일빌딩 7F-9F',
        website: 'https://finteam.co.kr',
    },
    {
        id: 3,
        name: '데코',
        contact: '황철현',
        phone: '010-4110-1549',
        address: '서울특별시 상봉중앙로 1길 20 데코BD 2~3F',
        website: 'http://everdeco.co.kr',
    },
    {
        id: 4,
        name: '이트너스㈜',
        contact: '이찬성 팀장',
        phone: '010-9098-2464',
        address: '경기도 과천시 과천대로7나길 60 과천어반허브 A동 5F',
        website: 'https://www.etners.com',
    },
]

const requirements = [
    '페이롤 아웃소싱 관련 사업 경험이 있는 파트너사',
    'ERP솔루션 개발/서비스/유지보수 사업이 가능한 파트너사',
    '다수의 하위 유통을 보유하거나 다양한 기업체를 보유한 파트너사',
]

export default function PartnersPage() {
    const router = useRouter()
    const isLoggedIn = useLoginStatus()

    return (
        <main className="min-h-screen bg-background">
            <Header/>
            {/* Hero Section */}
            <div
                className="relative bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border/50 py-16 overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div
                        className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl"></div>
                    <div
                        className="absolute bottom-10 right-10 w-72 h-72 bg-primary/50 rounded-full mix-blend-multiply filter blur-3xl"></div>
                </div>

                <div className="container max-w-7xl mx-auto px-4 relative">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Users className="h-8 w-8 text-primary"/>
                            <Badge className="bg-primary/10 text-primary border-0">Business Partner</Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                            파트너
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            비즈니스 파트너사는 고객에게 필요한 솔루션, 서비스 및 기술지원을 제공하기 위해 최선을 다하고 있습니다.
                        </p>
                    </div>
                </div>
            </div>

            {/* Partners Grid */}
            <div className="container max-w-7xl mx-auto px-4 py-16">
                <h2 className="text-2xl font-bold text-foreground mb-8">현재 파트너사</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {partners.map((partner) => (
                        <Card key={partner.id} className="hover:shadow-lg transition-all hover:border-primary/50">
                            <CardHeader>
                                <CardTitle className="text-lg">{partner.name}</CardTitle>
                                <CardDescription className="text-sm">{partner.contact}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-start gap-2 text-sm">
                                    <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5"/>
                                    <span className="text-foreground">{partner.phone}</span>
                                </div>

                                <div className="flex items-start gap-2 text-sm">
                                    <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5"/>
                                    <span className="text-foreground text-xs leading-relaxed">
                    {partner.address}
                  </span>
                                </div>

                                <Link href={partner.website} target="_blank" className="block">
                                    <Button variant="outline" size="sm" className="w-full gap-2">
                                        웹사이트 방문
                                        <ExternalLink className="h-3 w-3"/>
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Recruitment Section */}
                <div
                    className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20 p-12 mb-16">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-foreground mb-4">
                                에버타임·에버페이롤 사업을 함께하실{' '}
                                <span className="text-primary">비즈니스 파트너사</span>를 모집합니다
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                우리와 함께 성장하고 고객들에게 더 나은 솔루션을 제공할 수 있는 파트너를 찾고 있습니다.
                            </p>

                            {/* Requirements */}
                            <div className="space-y-4 mb-8">
                                {requirements.map((requirement, index) => (
                                    <div key={index} className="flex gap-3 items-start">
                                        <div
                                            className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-semibold text-sm">
                                            {index + 1}
                                        </div>
                                        <p className="text-foreground font-medium leading-relaxed">
                                            {requirement}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <Link href="/support/inquiry/write">
                                <Button size="lg" className="gap-2">
                                    파트너사 문의
                                    <ArrowRight className="h-5 w-5"/>
                                </Button>
                            </Link>
                        </div>

                        {/* Visual Element */}
                        <div className="hidden md:flex items-center justify-center">
                            <div className="relative">
                                <div
                                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl transform rotate-3"></div>
                                <div className="relative bg-white rounded-2xl p-8 shadow-lg">
                                    <Users className="h-32 w-32 text-primary/20 mx-auto mb-4"/>
                                    <p className="text-center text-sm text-muted-foreground">
                                        함께 성장하는 파트너사
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-foreground mb-8">파트너사의 이점</h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                title: '기술 지원',
                                description: '전문가 팀의 기술 지원과 교육 프로그램',
                            },
                            {
                                title: '마케팅 지원',
                                description: '공동 마케팅 및 브랜드 홍보 지원',
                            },
                            {
                                title: '비즈니스 성장',
                                description: '파트너사의 비즈니스 성장을 위한 다양한 지원',
                            },
                        ].map((benefit, index) => (
                            <Card key={index} className="bg-muted/30 border-0">
                                <CardContent className="pt-6">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0">
                                            <CheckCircle className="h-6 w-6 text-primary"/>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground mb-2">
                                                {benefit.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {benefit.description}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Contact CTA */}
                <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-8">
                        <div className="text-center">
                            <Mail className="h-12 w-12 text-primary mx-auto mb-4"/>
                            <h3 className="text-2xl font-bold text-foreground mb-2">
                                파트너사가 되어보세요
                            </h3>
                            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                                에버타임과 함께 비즈니스를 성장시킬 수 있는 파트너사를 모집하고 있습니다.
                                지금 바로 문의하세요.
                            </p>
                            <Link href="/support/inquiry/write">
                                <Button size="lg" className="gap-2">
                                    파트너 문의 신청
                                    <ArrowRight className="h-5 w-5"/>
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
            <Footer/>
        </main>
    )
}
