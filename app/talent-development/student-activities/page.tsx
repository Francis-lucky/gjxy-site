"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, ChevronLeft, ChevronRight, ChevronDown, Home } from "lucide-react"
import { useRouter } from "next/navigation"

export default function StudentActivitiesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const dropdownMenus = {
    学院概况: ["学院简介", "合作院校", "领导分工"],
    人才培养: ["学生活动", "风采展示", "学习交流", "下载专区"],
    招生就业: ["招生信息", "就业指导"],
    教学教务: ["培养模式", "培养方案", "教务管理"],
  }

  // 学生活动数据 - 15条
  const studentActivitiesData = [
    { title: "【学生活动】国际学院举办第十届文化艺术节开幕式", date: "2025.08.20" },
    { title: "【学生活动】国际学院学生参加重庆市大学生创新创业大赛", date: "2025.08.18" },
    { title: "【学生活动】国际学院组织学生参观重庆科技馆", date: "2025.08.15" },
    { title: "【学生活动】国际学院举办英语演讲比赛决赛", date: "2025.08.12" },
    { title: "【学生活动】国际学院学生会换届选举大会成功举行", date: "2025.08.10" },
    { title: "【学生活动】国际学院举办中俄文化交流晚会", date: "2025.08.08" },
    { title: "【学生活动】国际学院组织学生参加志愿服务活动", date: "2025.08.05" },
    { title: "【学生活动】国际学院举办学术讲座：人工智能发展趋势", date: "2025.08.03" },
    { title: "【学生活动】国际学院学生在全国大学生数学建模竞赛中获奖", date: "2025.08.01" },
    { title: "【学生活动】国际学院举办新生入学教育系列活动", date: "2025.07.28" },
    { title: "【学生活动】国际学院组织学生参加社会实践活动", date: "2025.07.25" },
    { title: "【学生活动】国际学院举办毕业生就业指导讲座", date: "2025.07.22" },
    { title: "【学生活动】国际学院学生参加国际交流项目面试", date: "2025.07.20" },
    { title: "【学生活动】国际学院举办体育文化节系列比赛", date: "2025.07.18" },
    { title: "【学生活动】国际学院组织学生参观企业实习基地", date: "2025.07.15" },
  ]

  const totalPages = Math.ceil(studentActivitiesData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentItems = studentActivitiesData.slice(startIndex, startIndex + itemsPerPage)

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

  const handleSidebarClick = (section: string) => {
    if (section === "学生活动") {
      router.push("/talent-development/student-activities")
    } else if (section === "风采展示") {
      router.push("/talent-development/showcase")
    } else if (section === "学习交流") {
      router.push("/talent-development/exchange")
    } else if (section === "下载专区") {
      router.push("/talent-development/downloads")
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch(e as any)
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
                <a href="/" className="hover:text-teal-200 transition-colors leading-7">
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
                <a href="/news" className="hover:text-teal-200 transition-colors">
                  新闻动态
                </a>
              </li>
            </ul>

            <div className="relative">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="请输入关键词搜索"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  className="pl-4 pr-10 py-2 rounded-full text-gray-800 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-teal-300 border-2 border-teal-300"
                />
                <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Search className="text-gray-500 w-4 h-4 hover:text-teal-600 transition-colors" />
                </button>
              </form>
            </div>
          </div>
        </nav>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Home className="w-4 h-4 text-blue-500" />
            <span className="text-blue-500">当前位置：</span>
            <a href="/" className="text-blue-500 hover:underline">
              首页
            </a>
            <span>{">"}</span>
            <span className="text-blue-500">人才培养</span>
            <span>{">"}</span>
            <span className="text-gray-800">学生活动</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="bg-teal-500 text-white px-4 py-3">
                <h2 className="text-lg font-semibold">人才培养</h2>
              </div>
              <nav className="py-2">
                {["学生活动", "风采展示", "学习交流", "下载专区"].map((item) => (
                  <button
                    key={item}
                    onClick={() => handleSidebarClick(item)}
                    className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                      item === "学生活动"
                        ? "bg-teal-50 text-teal-600 border-r-2 border-teal-500"
                        : "text-gray-700 hover:bg-gray-50 hover:text-teal-600"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content Area */}
          <div className="flex-1">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-6">
                <ul className="space-y-4">
                  {currentItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-4 py-3 border-b border-gray-100 last:border-b-0">
                      <span className="text-teal-500 text-lg mt-1">•</span>
                      <div className="flex-1">
                        <a
                          href="#"
                          className="text-gray-700 hover:text-teal-600 transition-colors leading-relaxed"
                          onClick={(e) => {
                            e.preventDefault()
                            console.log(`点击了: ${item.title}`)
                          }}
                        >
                          {item.title}
                        </a>
                      </div>
                      <span className="text-gray-400 text-sm whitespace-nowrap">{item.date}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    展示第{startIndex + 1}-{Math.min(startIndex + itemsPerPage, studentActivitiesData.length)}
                    条信息，共计
                    {studentActivitiesData.length}条信息
                  </div>

                  {totalPages > 1 && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 rounded-md text-sm ${
                            currentPage === page ? "bg-blue-500 text-white" : "border border-gray-300 hover:bg-gray-100"
                          }`}
                        >
                          {page}
                        </button>
                      ))}

                      <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
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
