"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, ChevronDown, Home } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ArticleDetailPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()

  const dropdownMenus = {
    学院概况: ["学院简介", "合作院校", "领导分工"],
    人才培养: ["学生活动", "风采展示", "学习交流", "下载专区"],
    招生就业: ["招生信息", "就业指导"],
    教学教务: ["培养模式", "培养方案", "教务管理"],
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

  const handleDropdownClick = (menuName: string, item: string) => {
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
    setActiveDropdown(null)
  }

  const handleSideNavClick = (section: string) => {
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
      {/* Header - 与首页保持一致 */}
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

      {/* 面包屑导航 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Home className="w-4 h-4 text-blue-500" />
            <span className="text-blue-500">当前位置：</span>
            <a href="/" className="text-blue-500 hover:underline">
              首页
            </a>
            <span>{">"}</span>
            <a href="/college-overview/introduction" className="text-blue-500 hover:underline">
              学院概况
            </a>
            <span>{">"}</span>
            <span className="text-blue-500">学院简介</span>
            <span>{">"}</span>
            <span className="text-gray-800">正文</span>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* 左侧导航 */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="bg-teal-500 text-white px-4 py-3">
                <h2 className="text-lg font-semibold">人才培养</h2>
              </div>
              <nav className="py-2">
                {["学生活动", "风采展示", "学习交流", "下载专区"].map((item) => (
                  <button
                    key={item}
                    onClick={() => handleSideNavClick(item)}
                    className="w-full text-left px-4 py-3 text-sm transition-colors text-gray-700 hover:bg-gray-50 hover:text-teal-600"
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* 右侧内容区域 */}
          <div className="flex-1">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-8">
                {/* 文章标题和发布信息 */}
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-gray-800 mb-4 leading-relaxed">
                    国际学院前往深圳开展访企拓岗活动
                  </h1>
                  <div className="text-sm text-gray-500 space-x-4">
                    <span>发布时间：2024年08月25日</span>
                  </div>
                </div>

                {/* 文章内容 */}
                <div className="prose max-w-none text-gray-700 leading-relaxed space-y-6">
                  <p className="text-base">
                    为了深入人才培养质量，拓宽学生就业渠道，加强校企校地企业之间的交流与合作，推动学生院校深度融合，7月25日至27日，国际学院院长王洋教授带队一行深入深圳，走访调研了中国电信股份有限公司深圳分公司（以下简称深圳电信）、深圳城市通信有限公司（以下简称城市通信）、腾讯科技（深圳）有限公司（以下简称腾讯科技）等企业。
                  </p>

                  <p className="text-base">
                    在深圳电信，调研团队深入了解了深圳电信信息技术发展和应用场景，双方就学生业市场化专业人才需求、校企发展、复合型人才培养、25届毕业生招聘等事宜进行了深入探讨。
                  </p>

                  <p className="text-base">
                    在深圳城市通信，公司向调研团队展示了其在网络通信领域的技术实力和创新产品，双方就新兴技术、专业人才培养模式、海外就业机会等方面进行了深入交流，旨在为学生提供更多实习和就业机会。
                  </p>

                  <p className="text-base">
                    在腾讯科技，公司向调研团队介绍了其在互联网科技领域的发展历程和未来规划，双方就校企合作模式、学院与腾讯科技等方面进行了深入探讨。
                  </p>

                  <p className="text-base">
                    此外，本次调研还深入为国际学院与深圳企业之间搭建了良好的沟通渠道，有助于进一步深化学院合作，推动教育改革，为培养新时代国际化人才提供了有力支持。下一步，学院将与企业携手共进，共同打造校企合作的新篇章。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - 与首页保持一致 */}
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
