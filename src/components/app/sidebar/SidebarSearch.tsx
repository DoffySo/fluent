"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SquarePen } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { useSearchStore } from "@/stores/search"

export default function SidebarSearch() {
    const search = useSearchStore((s) => s.search)
    const setSearch = useSearchStore((s) => s.setSearch)

    const handleChange = (value: string) => {
        setSearch({
            value,
            isSearching: value.length > 0,
        })
    }

    const handleCancel = () => {
        setSearch({
            value: "",
            isSearching: false,
        })
    }

    return (
        <div className="w-full px-2">
            <div className="flex items-center w-full relative overflow-x-hidden rounded-md">
                {/* Input wrapper with animated width */}
                <motion.div
                    className="relative w-full"
                    transition={{ duration: 0.2, ease: "easeOut" }}
                >
                    <Input
                        value={search?.value ?? ""}
                        onChange={(e) => handleChange(e.target.value)}
                        placeholder="Search"
                        className="transition-all duration-200 w-full"
                    />
                </motion.div>

                <AnimatePresence>
                    {!search?.isSearching && (
                        <motion.div
                            key="icon"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                        >
                            <Button
                                className="h-7 w-7"
                                size="icon"
                                variant="ghost"
                            >
                                <SquarePen />
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {search?.isSearching && (
                        <motion.div
                            key="cancel"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute right-0 top-1/2 -translate-y-1/2"
                        >
                            <Button
                                variant="link"
                                className="text-sm px-2 py-1"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
