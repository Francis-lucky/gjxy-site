"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, ChevronLeft, ChevronRight, FileText, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CollegePage() {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const bannerImages = [
    {
      src: "/images/banner1.jpg",
      alt: "学院现代化建筑群",
    },
    {
      src: "/images/banner2.jpg",
      alt: "学院全景视图",
    },
    {
      src: "/images/banner3.jpg",
      alt: "秋季校园景色",
    },
  ]

  const dropdownMenus = {
    学院概况: ["学院简介", "合作院校", "领导分工"],
    人才培养: ["学生活动", "风采展示", "学习交流", "下载专区"],
    招生就业: ["招生信息", "就业指导"],
    教学教务: ["培养模式", "培养方案", "教务管理"],
  }

  const newsItems = [
    { title: "【国际教育】国际学院学生团队在第十四届挑战杯竞赛中斩获佳绩", date: "2024.11.11" },
    { title: "【国际教育】国际学院学生团队在第十四届挑战杯竞赛中斩获佳绩", date: "2024.11.11" },
    { title: "【国际教育】国际学院学生团队在第十四届挑战杯竞赛中斩获佳绩", date: "2024.11.11" },
    { title: "【国际教育】国际学院学生团队在第十四届挑战杯竞赛中斩获佳绩", date: "2024.11.11" },
    { title: "【国际教育】国际学院学生团队在第十四届挑战杯竞赛中斩获佳绩", date: "2024.11.11" },
  ]

  const noticeItems = [
    { title: "【国际教育】国际学院学生团队在第十四届挑战杯竞赛中斩获佳绩", date: "2024.11.11" },
    { title: "【国际教育】国际学院学生团队在第十四届挑战杯竞赛中斩获佳绩", date: "2024.11.11" },
    { title: "【国际教育】国际学院学生团队在第十四届挑战杯竞赛中斩获佳绩", date: "2024.11.11" },
    { title: "【国际教育】国际学院学生团队在第十四届挑战杯竞赛中斩获佳绩", date: "2024.11.11" },
    { title: "【国际教育】国际学院学生团队在第十四届挑战杯竞赛中斩获佳绩", date: "2024.11.11" },
  ]

  const studentActivities = [
    { title: "【学生活动】国际学院举办第十届文化艺术节开幕式", date: "2025.08.20" },
    { title: "【学生活动】国际学院学生参加重庆市大学生创新创业大赛", date: "2025.08.18" },
    { title: "【学生活动】国际学院组织学生参观重庆科技馆", date: "2025.08.15" },
    { title: "【学生活动】国际学院举办英语演讲比赛决赛", date: "2025.08.12" },
    { title: "【学生活动】国际学院学生会换届选举大会成功举行", date: "2025.08.10" },
  ]

  const admissionInfo = [
    { title: "【招生信息】2025年国际学院本科招生简章", date: "2025.08.20" },
    { title: "【招生信息】中外合作办学项目招生政策解读", date: "2025.08.18" },
    { title: "【招生信息】国际学院专业介绍及就业前景", date: "2025.08.15" },
    { title: "【招生信息】2025年招生计划及录取分数线", date: "2025.08.12" },
    { title: "【招生信息】国际学院奖学金政策及申请条件", date: "2025.08.10" },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [bannerImages.length])

  const handleMouseEnter = (menuName: string) => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
      hideTimeoutRef.current = null
    }
    setActiveDropdown(menuName)
  }

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 300)
  }

  const handleDropdownMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
      hideTimeoutRef.current = null
    }
  }

  const handleDropdownMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 200)
  }

  const handleDropdownClick = (menuName: string, item: string) => {
    console.log(`点击了: ${menuName} - ${item}`)
    setActiveDropdown(null)

    if (menuName === "学院概况") {
      if (item === "学院简介") {
        router.push("/college-overview/introduction")
      } else if (item === "合作院校") {
        router.push("/college-overview/cooperation")
      } else if (item === "领导分工") {
        router.push("/college-overview/leadership")
      }
    } else if (menuName === "人才培养") {
      if (item === "学生活动") {
        router.push("/talent-development/student-activities")
      } else if (item === "风采展示") {
        router.push("/talent-development/showcase")
      } else if (item === "学习交流") {
        router.push("/talent-development/exchange")
      } else if (item === "下载专区") {
        router.push("/talent-development/downloads")
      }
    } else if (menuName === "招生就业") {
      if (item === "招生信息") {
        router.push("/admission-employment/admission")
      } else if (item === "就业指导") {
        router.push("/admission-employment/employment")
      }
    } else if (menuName === "教学教务") {
      if (item === "培养模式") {
        router.push("/academic-affairs/training-mode")
      } else if (item === "培养方案") {
        router.push("/academic-affairs/training-plan")
      } else if (item === "教务管理") {
        router.push("/academic-affairs/management")
      }
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-teal-500 text-white">
        <div className="text-center py-4">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide" style={{ fontFamily: "var(--font-alibaba)" }}>
            重庆邮电大学 远东联邦大学联合学院
          </h1>
          <p className="text-sm md:text-base mt-1 opacity-90" style={{ fontFamily: "var(--font-alibaba)" }}>
            CQUPT - FEFU Joint Institute
          </p>
        </div>

        <nav className="bg-teal-600 px-4 py-3 relative">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <ul
              className="flex flex-wrap items-center gap-6 md:gap-8 text-sm md:text-base relative"
              style={{ fontFamily: "var(--font-alibaba)" }}
            >
              <li>
                <a href="#" className="hover:text-teal-200 transition-colors leading-7">
                  首页
                </a>
              </li>
              {Object.entries(dropdownMenus).map(([menuName, subItems]) => (
                <li
                  key={menuName}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(menuName)}
                  onMouseLeave={handleMouseLeave}
                >
                  <a href="#" className="hover:text-teal-200 transition-colors flex items-center gap-1">
                    {menuName}
                    <ChevronDown className="w-4 h-4" />
                  </a>
                  {activeDropdown === menuName && (
                    <div
                      className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl py-2 min-w-[160px] z-50 transition-all duration-300 ease-out"
                      style={{
                        opacity: 1,
                        transform: "translateY(0)",
                        animation: "slideDown 0.3s ease-out forwards",
                      }}
                      onMouseEnter={handleDropdownMouseEnter}
                      onMouseLeave={handleDropdownMouseLeave}
                    >
                      {subItems.map((item, index) => (
                        <a
                          key={index}
                          href="#"
                          className="block px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-600 hover:pl-6 transition-all duration-300 ease-out text-sm border-l-2 border-transparent hover:border-teal-500 hover:shadow-sm"
                          onClick={(e) => {
                            e.preventDefault()
                            handleDropdownClick(menuName, item)
                          }}
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              ))}
              <li>
                <a
                  href="#"
                  className="hover:text-teal-200 transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    router.push("/news")
                  }}
                >
                  新闻动态
                </a>
              </li>
            </ul>

            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="请输入关键词搜索"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-10 py-2 rounded-full text-gray-800 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-teal-300 border-2 border-teal-300"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>
        </nav>
      </header>

      <section className="relative h-[400px] md:h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={bannerImages[currentSlide].src || "/placeholder.svg"}
            alt={bannerImages[currentSlide].alt}
            className="w-full h-full object-cover transition-opacity duration-500"
          />
        </div>

        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % bannerImages.length)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden relative">
            <div className="relative">
              <div className="bg-teal-500 text-white px-6 py-3 flex items-center gap-3 relative">
                <FileText className="w-5 h-5" />
                <span className="text-lg font-semibold">新闻动态</span>
              </div>
              <a
                href="/news"
                className="absolute top-3 right-4 text-orange-500 hover:text-orange-600 text-sm font-medium transition-colors"
              >
                更多+
              </a>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                {newsItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-4 py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-teal-500 text-sm mt-1">•</span>
                    <div className="flex-1">
                      <a
                        href="#"
                        className="text-gray-700 hover:text-teal-600 transition-colors text-sm leading-relaxed"
                      >
                        {item.title}
                      </a>
                    </div>
                    <span className="text-gray-400 text-sm whitespace-nowrap">{item.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden relative">
            <div className="relative">
              <div className="bg-teal-500 text-white px-6 py-3 flex items-center gap-3 relative">
                <FileText className="w-5 h-5" />
                <span className="text-lg font-semibold">通知公示</span>
              </div>
              <a
                href="/announcements"
                className="absolute top-3 right-4 text-orange-500 hover:text-orange-600 text-sm font-medium transition-colors"
              >
                更多+
              </a>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                {noticeItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-4 py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-teal-500 text-sm mt-1">•</span>
                    <div className="flex-1">
                      <a
                        href="#"
                        className="text-gray-700 hover:text-teal-600 transition-colors text-sm leading-relaxed"
                      >
                        {item.title}
                      </a>
                    </div>
                    <span className="text-gray-400 text-sm whitespace-nowrap">{item.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden relative">
            <div className="relative">
              <div className="bg-teal-500 text-white px-6 py-3 flex items-center gap-3 relative">
                <FileText className="w-5 h-5" />
                <span className="text-lg font-semibold">学生活动</span>
              </div>
              <a
                href="/talent-development/student-activities"
                className="absolute top-3 right-4 text-orange-500 hover:text-orange-600 text-sm font-medium transition-colors"
              >
                更多+
              </a>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                {studentActivities.map((item, index) => (
                  <li key={index} className="flex items-start gap-4 py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-teal-500 text-sm mt-1">•</span>
                    <div className="flex-1">
                      <a
                        href="#"
                        className="text-gray-700 hover:text-teal-600 transition-colors text-sm leading-relaxed"
                      >
                        {item.title}
                      </a>
                    </div>
                    <span className="text-gray-400 text-sm whitespace-nowrap">{item.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden relative">
            <div className="relative">
              <div className="bg-teal-500 text-white px-6 py-3 flex items-center gap-3 relative">
                <FileText className="w-5 h-5" />
                <span className="text-lg font-semibold">招生资讯</span>
              </div>
              <a
                href="/admission-employment/admission"
                className="absolute top-3 right-4 text-orange-500 hover:text-orange-600 text-sm font-medium transition-colors"
              >
                更多+
              </a>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                {admissionInfo.map((item, index) => (
                  <li key={index} className="flex items-start gap-4 py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-teal-500 text-sm mt-1">•</span>
                    <div className="flex-1">
                      <a
                        href="#"
                        className="text-gray-700 hover:text-teal-600 transition-colors text-sm leading-relaxed"
                      >
                        {item.title}
                      </a>
                    </div>
                    <span className="text-gray-400 text-sm whitespace-nowrap">{item.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-teal-500 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4 text-lg">友情链接</h3>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <a
                  href="http://jw.cq.gov.cn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-200 transition-colors"
                >
                  重庆市教育委员会
                </a>
                <span className="text-teal-300">|</span>
                <a
                  href="http://zfwb.cq.gov.cn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-200 transition-colors"
                >
                  重庆市人民政府外事办公室
                </a>
                <span className="text-teal-300">|</span>
                <a
                  href="http://gaj.cq.gov.cn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-200 transition-colors"
                >
                  重庆公安出入境网上服务大厅
                </a>
                <span className="text-teal-300">|</span>
                <a
                  href="http://www.cqupt.edu.cn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-200 transition-colors"
                >
                  重庆邮电大学
                </a>
                <span className="text-teal-300">|</span>
                <a
                  href="http://gjc.cqupt.edu.cn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-200 transition-colors"
                >
                  重庆邮电大学国际处
                </a>
                <span className="text-teal-300">|</span>
                <a
                  href="http://jsj.moe.gov.cn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-200 transition-colors"
                >
                  教育部教育涉外监管信息网
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-lg">联系我们</h3>
              <div className="space-y-2 text-sm">
                <p>通讯地址：重庆市南岸区崇文路2号重庆邮电大学国际学院</p>
                <p>邮编：400065</p>
                <p>联系电话：+68-23-62480019</p>
                <p>传真：+68-23-62471951</p>
                <p>技术支持：CQUPTHUB工作室</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
