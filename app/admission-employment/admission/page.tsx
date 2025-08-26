"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Home, Search, ChevronDown } from "lucide-react"

export default function AdmissionPage() {
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

  const admissionData = [
    { title: "【招生信息】（测试）2025年国际学院本科招生简章", date: "2025.08.20" },
    { title: "【招生信息】（测试）中外合作办学项目招生政策解读", date: "2025.08.18" },
    { title: "【招生信息】（测试）国际学院专业介绍及就业前景", date: "2025.08.15" },
    { title: "【招生信息】（测试）2025年招生计划及录取分数线", date: "2025.08.12" },
    { title: "【招生信息】（测试）国际学院奖学金政策及申请条件", date: "2025.08.10" },
    { title: "【招生信息】（测试）双学位项目招生说明会通知", date: "2025.08.08" },
    { title: "【招生信息】（测试）国际学院入学考试安排及要求", date: "2025.08.05" },
    { title: "【招生信息】（测试）中外合作办学学费标准及缴费方式", date: "2025.08.03" },
    { title: "【招生信息】（测试）国际学院新生入学指南", date: "2025.08.01" },
    { title: "【招生信息】（测试）转专业政策及申请流程", date: "2025.07.28" },
    { title: "【招生信息】（测试）国际学院招生咨询热线开通", date: "2025.07.25" },
  ]

  const totalPages = Math.ceil(admissionData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentItems = admissionData.slice(startIndex, startIndex + itemsPerPage)

  const handleDropdownClick = (menuName: string, item: string) => {
    console.log(`点击了: ${menuName} - ${item}`)
    setActiveDropdown(null)

    if (menuName === "学院概况") {
      if (item === "学院简介") router.push("/college-overview/introduction")
      else if (item === "合作院校") router.push("/college-overview/cooperation")
      else if (item === "领导分工") router.push("/college-overview/leadership")
    } else if (menuName === "人才培养") {
      if (item === "学生活动") router.push("/talent-development/student-activities")
      else if (item === "风采展示") router.push("/talent-development/showcase")
      else if (item === "学习交流") router.push("/talent-development/exchange")
      else if (item === "下载专区") router.push("/talent-development/downloads")
    } else if (menuName === "招生就业") {
      if (item === "招生信息") router.push("/admission-employment/admission")
      else if (item === "就业指导") router.push("/admission-employment/employment")
    } else if (menuName === "教学教务") {
      if (item === "培养模式") router.push("/academic-affairs/training-mode")
      else if (item === "培养方案") router.push("/academic-affairs/training-plan")
      else if (item === "教务管理") router.push("/academic-affairs/management")
    }
  }

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
                <a href="#" className="hover:text-teal-200 transition-colors">
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

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <Home className="w-4 h-4 text-blue-600" />
            <span className="ml-2">当前位置：</span>
            <a href="/" className="text-blue-600 hover:underline">
              首页
            </a>
            <span className="mx-2">{">"}</span>
            <span className="text-blue-600">招生就业</span>
            <span className="mx-2">{">"}</span>
            <span>招生信息</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="bg-teal-500 text-white px-4 py-3">
                <h2 className="font-semibold text-lg">招生就业</h2>
              </div>
              <nav className="py-2">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    router.push("/admission-employment/admission")
                  }}
                  className="block px-4 py-3 bg-teal-50 text-teal-600 border-r-2 border-teal-500"
                >
                  招生信息
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    router.push("/admission-employment/employment")
                  }}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-teal-600 transition-colors"
                >
                  就业指导
                </a>
              </nav>
            </div>
          </aside>

          {/* Content Area */}
          <main className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="space-y-4">
                {currentItems.map((item, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-start gap-4">
                      <span className="text-teal-500 text-lg mt-1">•</span>
                      <div className="flex-1">
                        <a
                          href="#"
                          className="text-gray-800 hover:text-teal-600 transition-colors text-base leading-relaxed"
                        >
                          {item.title}
                        </a>
                      </div>
                      <span className="text-gray-400 text-sm whitespace-nowrap">{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    展示第{startIndex + 1}-{Math.min(startIndex + itemsPerPage, admissionData.length)}条信息，共计
                    {admissionData.length}条信息
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      上一页
                    </button>
                    <span className="text-sm text-gray-600">
                      {currentPage} / {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:cursor-not-allowed"
                    >
                      下一页
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

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
