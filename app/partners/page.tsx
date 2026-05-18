'use client'

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Link from 'next/link'
import Image from 'next/image'
import {useRouter} from 'next/navigation'
import {useLoginStatus} from '@/redux/selectors/Users'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Badge} from '@/components/ui/badge'
import {Users, Mail, Phone, MapPin, ExternalLink, CheckCircle, ArrowRight, Building2, Zap} from 'lucide-react'

interface Partner {
    id: number
    name: string
    contact: string
    phone: string
    address: string
    website: string
    logo: string
}

const partners: Partner[] = [
    {
        id: 1,
        name: '(주)바른솔텍',
        contact: '박전성',
        phone: '02-2666-1874',
        address: '서울특별시 금천구 가산디지털2로 144 1418호(가산동, 현대테라타워 가산DK)',
        website: 'http://barunsoltek.com',
        logo: '/images/parter_logo/partner-barun.png',
    },
    {
        id: 2,
        name: '핀팀페이(by 회계법인 호안)',
        contact: '박경민 회계사',
        phone: '02-6953-6783',
        address: '서울시 송파구 올림픽로 102, 서일빌딩 7F-9F',
        website: 'https://finteam.co.kr',
        logo: '/images/parter_logo/partner-finteam.png',
    },
    {
        id: 3,
        name: '(주)데코',
        contact: '황철현',
        phone: '010-4110-1549',
        address: '서울특별시 상봉중앙로 1길 20 데코BD 2~3F',
        website: 'http://everdeco.co.kr',
        logo: '/images/parter_logo/partner-deco-new.png',
    },
    {
        id: 4,
        name: '이트너스㈜',
        contact: '이찬성 팀장',
        phone: '010-9098-2464',
        address: '경기도 과천시 과천대로7나길 60 과천어반허브 A동 5F',
        website: 'https://www.etners.com',
        logo: '/images/parter_logo/partner-etners.png',
    },
    {
        id: 5,
        name: '(주)네그루',
        contact: '박대호 회계사',
        phone: '070-4117-7516',
        address: '경기도 하남시 미사강변대로 165',
        website: 'http://www.negru.kr',
        logo: '/images/parter_logo/partner-negru.png',
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
                className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 py-20 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-20">
                    <div
                        className="absolute top-20 left-20 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                    <div
                        className="absolute top-40 right-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                    <div
                        className="absolute -bottom-20 left-1/2 w-96 h-96 bg-primary/50 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
                </div>

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}
                />

                <div className="container max-w-7xl mx-auto px-4 relative">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <Building2 className="h-8 w-8 text-cyan-400"/>
                            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 px-4 py-1.5">Business Partner Ecosystem</Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            에버타임과 함께하는
                            <br/>
                            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-primary bg-clip-text text-transparent">
                                파트너사 네트워크
                            </span>
                        </h1>
                        <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
                            비즈니스 파트너사는 고객에게 필요한 솔루션, 서비스 및 기술지원을 제공하기 위해 최선을 다하고 있습니다.
                        </p>
                    </div>
                </div>
            </div>

            {/* Partners Grid */}
            <div className="container max-w-7xl mx-auto px-4 py-20">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-foreground mb-3">현재 파트너사</h2>
                    <p className="text-muted-foreground">에버타임과 함께 성장하고 있는 파트너들입니다</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-20">
                    {partners.map((partner) => (
                        <Card 
                            key={partner.id} 
                            className="group relative overflow-hidden hover:shadow-2xl hover:border-primary/50 transition-all duration-300 border-slate-200 hover:scale-105 hover:-translate-y-1"
                        >
                            {/* Card Gradient Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-slate-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                            
                            <CardHeader className="relative pb-0 border-b border-slate-100">
                                {/* Logo Container */}
                                <div className="h-32 flex items-center justify-center mb-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4 overflow-hidden">
                                    <Image
                                        src={partner.logo}
                                        alt={partner.name}
                                        width={120}
                                        height={60}
                                        className="max-w-full h-auto object-contain"
                                    />
                                </div>
                                <CardTitle className="text-base font-bold text-slate-900">{partner.name}</CardTitle>
                                <CardDescription className="text-sm text-slate-600">{partner.contact}</CardDescription>
                            </CardHeader>
                            
                            <CardContent className="relative space-y-3 pt-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <Phone className="h-4 w-4 text-primary flex-shrink-0"/>
                                    <span className="text-slate-700 font-medium">{partner.phone}</span>
                                </div>

                                <div className="flex items-start gap-2 text-sm">
                                    <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5"/>
                                    <span className="text-slate-600 text-xs leading-snug">
                                        {partner.address}
                                    </span>
                                </div>

                                <Link href={partner.website} target="_blank" className="block pt-2">
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="w-full gap-2 border-slate-200 hover:border-primary hover:text-primary transition-all text-sm font-medium"
                                    >
                                        웹사이트
                                        <ExternalLink className="h-3 w-3"/>
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Recruitment Section */}
                <div
                    className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 p-12 mb-20 relative overflow-hidden">
                    {/* Background Decorations */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-20 right-20 w-80 h-80 bg-primary rounded-full blur-3xl"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                        <div>
                            <Badge className="mb-4 bg-cyan-500/20 text-cyan-400 border-cyan-500/30 px-4 py-1.5">
                                <Zap className="h-3 w-3 mr-2"/>
                                새로운 기회
                            </Badge>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                에버타임·에버페이롤과
                                <br/>
                                <span className="bg-gradient-to-r from-cyan-400 to-primary bg-clip-text text-transparent">
                                    함께 성장할 파트너
                                </span>
                                를 찾습니다
                            </h2>
                            <p className="text-slate-300 mb-8 leading-relaxed">
                                우리와 함께 성장하고 고객들에게 더 나은 솔루션을 제공할 수 있는 파트너를 찾고 있습니다.
                            </p>

                            {/* Requirements */}
                            <div className="space-y-4 mb-8">
                                {requirements.map((requirement, index) => (
                                    <div key={index} className="flex gap-3 items-start">
                                        <div
                                            className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-r from-cyan-400 to-primary text-white font-semibold text-sm">
                                            <CheckCircle className="h-5 w-5"/>
                                        </div>
                                        <p className="text-slate-200 font-medium leading-relaxed pt-0.5">
                                            {requirement}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <Link href="/support/inquiry/write">
                                <Button size="lg" className="gap-2 bg-gradient-to-r from-cyan-500 to-primary hover:from-cyan-600 hover:to-primary/90 text-white border-0">
                                    파트너사 문의
                                    <ArrowRight className="h-5 w-5"/>
                                </Button>
                            </Link>
                        </div>

                        {/* Visual Element */}
                        <div className="hidden md:flex items-center justify-center">
                            <div className="relative">
                                <div
                                    className="absolute inset-0 bg-gradient-to-r from-primary/30 to-cyan-500/30 rounded-2xl transform rotate-3 blur-2xl"></div>
                                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-12 shadow-2xl border border-slate-700/50">
                                    <div className="text-center">
                                        <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-primary/20 mb-4">
                                            <Users className="h-10 w-10 text-cyan-400"/>
                                        </div>
                                        <p className="text-white font-semibold text-lg mb-2">함께 성장하는</p>
                                        <p className="text-slate-400">파트너 네트워크</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="mb-20">
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-3">파트너사의 이점</h2>
                        <p className="text-muted-foreground">에버타임 파트너가 되었을 때의 다양한 혜택들</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                title: '기술 지원',
                                description: '전문가 팀의 기술 지원과 교육 프로그램',
                                icon: '🚀',
                            },
                            {
                                title: '마케팅 지원',
                                description: '공동 마케팅 및 브랜드 홍보 지원',
                                icon: '📈',
                            },
                            {
                                title: '비즈니스 성장',
                                description: '파트너사의 비즈니스 성장을 위한 다양한 지원',
                                icon: '🎯',
                            },
                        ].map((benefit, index) => (
                            <Card key={index} className="bg-gradient-to-br from-white to-slate-50 border-slate-200 hover:shadow-lg hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                                <CardContent className="pt-8">
                                    <div className="mb-4 text-4xl">{benefit.icon}</div>
                                    <h3 className="font-bold text-foreground mb-2 text-lg">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Contact CTA */}
                <Card className="bg-gradient-to-br from-primary/10 to-cyan-500/10 border-primary/30 mb-12">
                    <CardContent className="pt-12 pb-12">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-cyan-500 mb-6">
                                <Mail className="h-8 w-8 text-white"/>
                            </div>
                            <h3 className="text-3xl font-bold text-foreground mb-3">
                                파트너사가 되어보세요
                            </h3>
                            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                                에버타임과 함께 비즈니스를 성장시킬 수 있는 파트너사를 모집하고 있습니다.
                                지금 바로 문의하세요.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/support/inquiry/write">
                                    <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-600 text-white border-0">
                                        파트너 문의 신청
                                        <ArrowRight className="h-5 w-5"/>
                                    </Button>
                                </Link>
                                <Link href="/">
                                    <Button size="lg" variant="outline" className="gap-2 border-slate-200 hover:bg-slate-50">
                                        홈으로 돌아가기
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Footer/>
        </main>
    )
}
