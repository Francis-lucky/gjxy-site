"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, ChevronDown, Home } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
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

  const allData = [
    // 新闻动态
    {
      title: "【国际教育】国际学院学生团队在第十四届挑战杯竞赛中斩获佳绩",
      date: "2024.11.11",
      category: "新闻动态",
      url: "/news",
    },
    {
      title: "【学术交流】国际学院举办中外合作办学质量提升研讨会",
      date: "2024.11.08",
      category: "新闻动态",
      url: "/news",
    },
    { title: "【校园活动】国际学院2024年秋季运动会圆满举行", date: "2024.11.05", category: "新闻动态", url: "/news" },
    { title: "【教学改革】国际学院推进双语教学模式创新发展", date: "2024.11.02", category: "新闻动态", url: "/news" },
    { title: "【国际合作】远东联邦大学代表团访问我院", date: "2024.10.30", category: "新闻动态", url: "/news" },
    { title: "【学生风采】国际学院学生在全国英语竞赛中获奖", date: "2024.10.28", category: "新闻动态", url: "/news" },
    { title: "【科研成果】国际学院教师在国际期刊发表重要论文", date: "2024.10.25", category: "新闻动态", url: "/news" },
    { title: "【文化交流】国际学院举办中俄文化节活动", date: "2024.10.22", category: "新闻动态", url: "/news" },
    {
      title: "【就业指导】国际学院开展2025届毕业生就业指导讲座",
      date: "2024.10.20",
      category: "新闻动态",
      url: "/news",
    },
    { title: "【党建工作】国际学院党委开展主题教育实践活动", date: "2024.10.18", category: "新闻动态", url: "/news" },
    { title: "【招生宣传】国际学院参加重庆市教育展览会", date: "2024.10.15", category: "新闻动态", url: "/news" },

    // 通知公示
    {
      title: "【通知公告】关于2024年秋季学期期末考试安排的通知",
      date: "2024.11.08",
      category: "通知公示",
      url: "/announcements",
    },
    {
      title: "【招生公告】2025年春季学期交换生项目申请通知",
      date: "2024.11.05",
      category: "通知公示",
      url: "/announcements",
    },
    {
      title: "【学术公告】国际学院2024年度学术报告会安排",
      date: "2024.11.02",
      category: "通知公示",
      url: "/announcements",
    },
    {
      title: "【管理通知】关于加强学生宿舍管理的通知",
      date: "2024.10.30",
      category: "通知公示",
      url: "/announcements",
    },
    {
      title: "【奖学金公示】2024年度优秀学生奖学金获奖名单公示",
      date: "2024.10.28",
      category: "通知公示",
      url: "/announcements",
    },
    {
      title: "【考试通知】关于2024年下半年英语等级考试报名的通知",
      date: "2024.10.25",
      category: "通知公示",
      url: "/announcements",
    },
    {
      title: "【活动公告】国际学院文化节活动方案公布",
      date: "2024.10.22",
      category: "通知公示",
      url: "/announcements",
    },
    {
      title: "【就业通知】2025届毕业生就业推荐表填写说明",
      date: "2024.10.20",
      category: "通知公示",
      url: "/announcements",
    },
    {
      title: "【学籍管理】关于学生学籍信息核查的通知",
      date: "2024.10.18",
      category: "通知公示",
      url: "/announcements",
    },
    { title: "【安全提醒】校园安全防范温馨提示", date: "2024.10.15", category: "通知公示", url: "/announcements" },

    // 学院简介
    {
      title: "《重庆邮电大学全面落实研究生指导教师立德树人职责实施细则》",
      date: "2025.08.20",
      category: "学院简介",
      url: "/college-overview/introduction",
    },
    {
      title: "重庆邮电大学远东联邦大学联合学院成立暨揭牌仪式隆重举行",
      date: "2025.08.15",
      category: "学院简介",
      url: "/college-overview/introduction",
    },
    {
      title: "学院与俄罗斯远东联邦大学签署合作办学协议",
      date: "2025.08.10",
      category: "学院简介",
      url: "/college-overview/introduction",
    },
    {
      title: "国际化人才培养模式创新与实践研讨会成功举办",
      date: "2025.08.05",
      category: "学院简介",
      url: "/college-overview/introduction",
    },
    {
      title: "学院首届中俄联合培养学生顺利毕业",
      date: "2025.07.30",
      category: "学院简介",
      url: "/college-overview/introduction",
    },
    {
      title: "中俄教育合作项目获得教育部正式批准",
      date: "2025.07.25",
      category: "学院简介",
      url: "/college-overview/introduction",
    },
    {
      title: "学院教学设施建设项目全面完工",
      date: "2025.07.20",
      category: "学院简介",
      url: "/college-overview/introduction",
    },
    {
      title: "国际学院师资队伍建设取得重要进展",
      date: "2025.07.15",
      category: "学院简介",
      url: "/college-overview/introduction",
    },
    {
      title: "学院与多家知名企业建立实习合作关系",
      date: "2025.07.10",
      category: "学院简介",
      url: "/college-overview/introduction",
    },
    {
      title: "首批俄语教学课程正式开设",
      date: "2025.07.05",
      category: "学院简介",
      url: "/college-overview/introduction",
    },

    // 学生活动
    {
      title: "【学生活动】国际学院举办第十届文化艺术节开幕式",
      date: "2025.08.20",
      category: "学生活动",
      url: "/talent-development/student-activities",
    },
    {
      title: "【学生活动】国际学院学生参加重庆市大学生创新创业大赛",
      date: "2025.08.18",
      category: "学生活动",
      url: "/talent-development/student-activities",
    },
    {
      title: "【学生活动】国际学院组织学生参观重庆科技馆",
      date: "2025.08.15",
      category: "学生活动",
      url: "/talent-development/student-activities",
    },
    {
      title: "【学生活动】国际学院举办英语演讲比赛决赛",
      date: "2025.08.12",
      category: "学生活动",
      url: "/talent-development/student-activities",
    },
    {
      title: "【学生活动】国际学院学生会换届选举大会成功举行",
      date: "2025.08.10",
      category: "学生活动",
      url: "/talent-development/student-activities",
    },
    {
      title: "【学生活动】国际学院举办中俄文化交流周活动",
      date: "2025.08.08",
      category: "学生活动",
      url: "/talent-development/student-activities",
    },
    {
      title: "【学生活动】国际学院学生志愿服务团队成立",
      date: "2025.08.05",
      category: "学生活动",
      url: "/talent-development/student-activities",
    },
    {
      title: "【学生活动】国际学院举办学术讲座系列活动",
      date: "2025.08.03",
      category: "学生活动",
      url: "/talent-development/student-activities",
    },
    {
      title: "【学生活动】国际学院学生参加全国数学建模竞赛",
      date: "2025.08.01",
      category: "学生活动",
      url: "/talent-development/student-activities",
    },
    {
      title: "【学生活动】国际学院新生入学教育活动圆满结束",
      date: "2025.07.28",
      category: "学生活动",
      url: "/talent-development/student-activities",
    },

    // 招生信息
    {
      title: "【招生信息】2025年国际学院本科招生简章",
      date: "2025.08.20",
      category: "招生信息",
      url: "/admission-employment/admission",
    },
    {
      title: "【招生信息】中外合作办学项目招生政策解读",
      date: "2025.08.18",
      category: "招生信息",
      url: "/admission-employment/admission",
    },
    {
      title: "【招生信息】国际学院专业介绍及就业前景",
      date: "2025.08.15",
      category: "招生信息",
      url: "/admission-employment/admission",
    },
    {
      title: "【招生信息】2025年招生计划及录取分数线",
      date: "2025.08.12",
      category: "招生信息",
      url: "/admission-employment/admission",
    },
    {
      title: "【招生信息】国际学院奖学金政策及申请条件",
      date: "2025.08.10",
      category: "招生信息",
      url: "/admission-employment/admission",
    },
    {
      title: "【招生信息】双学位项目招生说明会通知",
      date: "2025.08.08",
      category: "招生信息",
      url: "/admission-employment/admission",
    },
    {
      title: "【招生信息】国际学院入学考试安排及要求",
      date: "2025.08.05",
      category: "招生信息",
      url: "/admission-employment/admission",
    },
    {
      title: "【招生信息】中外合作办学学费标准及缴费方式",
      date: "2025.08.03",
      category: "招生信息",
      url: "/admission-employment/admission",
    },
    {
      title: "【招生信息】国际学院新生入学指南",
      date: "2025.08.01",
      category: "招生信息",
      url: "/admission-employment/admission",
    },
    {
      title: "【招生信息】转专业政策及申请流程",
      date: "2025.07.28",
      category: "招生信息",
      url: "/admission-employment/admission",
    },

    // 就业指导
    {
      title: "【就业指导】2025届毕业生就业指导讲座安排",
      date: "2025.08.20",
      category: "就业指导",
      url: "/admission-employment/employment",
    },
    {
      title: "【就业指导】国际学院毕业生就业质量报告",
      date: "2025.08.18",
      category: "就业指导",
      url: "/admission-employment/employment",
    },
    {
      title: "【就业指导】海外就业机会及申请指南",
      date: "2025.08.15",
      category: "就业指导",
      url: "/admission-employment/employment",
    },
    {
      title: "【就业指导】校园招聘会企业信息汇总",
      date: "2025.08.12",
      category: "就业指导",
      url: "/admission-employment/employment",
    },
    {
      title: "【就业指导】简历制作与面试技巧培训",
      date: "2025.08.10",
      category: "就业指导",
      url: "/admission-employment/employment",
    },

    // 风采展示
    {
      title: "【风采展示】国际学院学生在全国大学生英语竞赛中获奖",
      date: "2025.08.20",
      category: "风采展示",
      url: "/talent-development/showcase",
    },
    {
      title: "【风采展示】国际学院优秀毕业生赴海外名校深造",
      date: "2025.08.18",
      category: "风采展示",
      url: "/talent-development/showcase",
    },
    {
      title: "【风采展示】国际学院学生创新创业项目获批立项",
      date: "2025.08.15",
      category: "风采展示",
      url: "/talent-development/showcase",
    },
    {
      title: "【风采展示】国际学院学生参加中俄大学生艺术节",
      date: "2025.08.12",
      category: "风采展示",
      url: "/talent-development/showcase",
    },
    {
      title: "【风采展示】国际学院志愿服务团队获市级表彰",
      date: "2025.08.10",
      category: "风采展示",
      url: "/talent-development/showcase",
    },

    // 学习交流
    {
      title: "【学习交流】中俄大学线上学术交流活动成功举办",
      date: "2025.08.20",
      category: "学习交流",
      url: "/talent-development/exchange",
    },
    {
      title: "【学习交流】国际学院举办中俄大学生文化交流项目",
      date: "2025.08.18",
      category: "学习交流",
      url: "/talent-development/exchange",
    },
    {
      title: "【学习交流】国际化人才培养模式研讨会召开",
      date: "2025.08.15",
      category: "学习交流",
      url: "/talent-development/exchange",
    },
    {
      title: "【学习交流】国际学院学生赴俄罗斯短期交流学习",
      date: "2025.08.12",
      category: "学习交流",
      url: "/talent-development/exchange",
    },
    {
      title: "【学习交流】双语教学经验分享会成功举办",
      date: "2025.08.10",
      category: "学习交流",
      url: "/talent-development/exchange",
    },

    // 下载专区
    {
      title: "【下载专区】国际学院学生手册（2025版）",
      date: "2025.08.20",
      category: "下载专区",
      url: "/talent-development/downloads",
    },
    {
      title: "【下载专区】中外合作办学项目申请表",
      date: "2025.08.18",
      category: "下载专区",
      url: "/talent-development/downloads",
    },
    {
      title: "【下载专区】国际学院课程设置及学分要求",
      date: "2025.08.15",
      category: "下载专区",
      url: "/talent-development/downloads",
    },
    {
      title: "【下载专区】学生交流项目申请指南",
      date: "2025.08.12",
      category: "下载专区",
      url: "/talent-development/downloads",
    },
    {
      title: "【下载专区】国际学院毕业论文格式要求",
      date: "2025.08.10",
      category: "下载专区",
      url: "/talent-development/downloads",
    },
  ]

  const queryFromUrl = searchParams.get("q") || ""

  useEffect(() => {
    if (queryFromUrl) {
      setSearchQuery(queryFromUrl)
    }
  }, [queryFromUrl])

  const searchResults = allData.filter((item) => item.title.toLowerCase().includes(queryFromUrl.toLowerCase()))

  const highlightKeyword = (text: string, keyword: string) => {
    if (!keyword) return text

    const regex = new RegExp(`(${keyword})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-red-200 text-red-800 font-medium">
          {part}
        </span>
      ) : (
        part
      ),
    )
  }

  const totalPages = Math.ceil(searchResults.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentItems = searchResults.slice(startIndex, startIndex + itemsPerPage)

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
    <div className="min-h-screen bg-gray-50">
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

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <Home className="w-4 h-4 mr-2" />
            <a href="/" className="hover:text-teal-600 transition-colors">
              首页
            </a>
            <span className="mx-2">&gt;</span>
            <span className="text-teal-600">搜索结果</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="bg-teal-500 text-white px-6 py-4 rounded-t-lg">
            <h1 className="text-xl font-semibold">搜索结果 {queryFromUrl && `- "${queryFromUrl}"`}</h1>
            <p className="text-sm mt-1 opacity-90">找到 {searchResults.length} 条相关信息</p>
          </div>

          <div className="p-6">
            {currentItems.length > 0 ? (
              <ul className="space-y-4">
                {currentItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-b-0">
                    <span className="text-teal-500 text-sm mt-1">•</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs bg-teal-100 text-teal-600 px-2 py-1 rounded">{item.category}</span>
                        <span className="text-gray-400 text-sm">{item.date}</span>
                      </div>
                      <a
                        href={item.url}
                        className="text-gray-700 hover:text-teal-600 transition-colors leading-relaxed block"
                      >
                        {highlightKeyword(item.title, queryFromUrl)}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-2">未找到相关信息</div>
                <p className="text-gray-500 text-sm">请尝试使用其他关键词搜索</p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  上一页
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 text-sm border rounded ${
                      currentPage === page
                        ? "bg-teal-500 text-white border-teal-500"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  下一页
                </button>
              </div>
            )}
          </div>
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
