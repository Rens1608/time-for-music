'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useLocale } from 'next-intl'

export function LocaleSwitcher() {
    const router = useRouter()
    const pathname = usePathname()
    const search = useSearchParams().toString()
    const currentLocale = useLocale()

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLocale = e.target.value
        // Split path into segments, replace index 1 (the locale), rejoin
        const segments = pathname.split('/')
        segments[1] = newLocale
        const newPath = segments.join('/') || '/'
        // Append search params if any
        const url = search ? `${newPath}?${search}` : newPath
        router.push(url)
    }

    return (
        <select value={currentLocale} onChange={handleChange}>
            <option value="en">English</option>
            <option value="nl">Nederlands</option>
        </select>
    )
}