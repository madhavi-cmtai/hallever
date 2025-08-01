"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, Search, User, LogIn, UserPlus, Globe, X } from "lucide-react"
import { Language, useLanguage } from "@/context/language-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)
  const { t, language, setLanguage } = useLanguage()
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Search:", searchQuery)
  }

  const handleLogin = () => router.push("/login")
  const handleRegister = () => router.push("/signup")

  const navigationItems = [
    { name: t("header.home"), href: "/" },
    { name: t("header.about"), href: "/about" },
    { name: t("header.products"), href: "/products" },
    { name: t("header.services"), href: "/services" },
    { name: t("header.blogs"), href: "/blogs" },
    { name: t("header.careers"), href: "/careers" },
    { name: t("header.contact"), href: "/contact" },
  ]

  return (
    <header className="w-full bg-background border-b border-border shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 lg:-mt-3 lg:-ml-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/images/logo.png"
                alt="Hallever Logo"
                width={140}
                height={60}
                className="object-contain"
              />
            </motion.div>
          </Link>

          {/* Hamburger Menu */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-4">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t("search.placeholder") || "Search..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 w-full"
              />
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground font-medium text-sm transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden sm:flex items-center space-x-3 ml-4">
            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-10 h-10 p-2 hover:bg-accent">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem onClick={handleLogin}>
                  <LogIn className="mr-2 h-4 w-4" />
                  {t("auth.login")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleRegister}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  {t("auth.register")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-10 h-10 p-2 hover:bg-accent">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                {[
                  { code: "en", label: "English" },
                  { code: "hi", label: "हिन्दी" },
                  { code: "mr", label: "मराठी" },
                  { code: "ta", label: "தமிழ்" },
                  { code: "bn", label: "বাংলা" },
                  { code: "te", label: "తెలుగు" }
                ].map(({ code, label }) => (
                  <DropdownMenuItem
                    key={code}
                    onClick={() => setLanguage(code as Language)}
                    className={language === code ? "font-semibold text-grey-600" : ""}
                  >
                    {label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden mt-2 space-y-2 pb-4">
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 text-muted-foreground hover:text-foreground font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Search */}
            <div className="px-4 mt-2 md:hidden">
              <form onSubmit={handleSearch} className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={t("search.placeholder") || "Search..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 w-full"
                />
              </form>
            </div>

            {/* Mobile Actions */}
            <div className="flex sm:hidden items-center space-x-3 px-4 mt-4">
              <Button onClick={handleLogin} className="flex-1 bg-primary text-white">
                {t("auth.login")}
              </Button>
              <Button onClick={handleRegister} className="flex-1 bg-muted text-foreground">
                {t("auth.register")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
