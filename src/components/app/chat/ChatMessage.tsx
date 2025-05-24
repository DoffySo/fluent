import { format, isToday, isThisWeek, parseISO } from 'date-fns'
import { Check, CheckCheck } from 'lucide-react'

export interface IProps {
    messageId: string;
    message: string;
    time: string;
    isOwn?: boolean;
    username?: string;
    delivered?: boolean;
    read?: boolean;
}


const safeParseDate = (dateString: string): Date => {
    try {
        const date = parseISO(dateString)
        if (isNaN(date.getTime())) {
            console.warn('Invalid date string:', dateString)
            return new Date() // Fallback
        }
        return date
    } catch (e) {
        console.error('Date parsing error:', e)
        return new Date() // Fallback
    }
}

export function formatMessageTime(dateString: string): string {
    const date = safeParseDate(dateString)
    if (isToday(date)) return format(date, 'HH:mm')
    if (isThisWeek(date, { weekStartsOn: 1 })) return format(date, 'EEE')
    return format(date, 'dd.MM.yyyy')
}


export default function ChatMessage({
                                        messageId,
                                        message,
                                        time,
                                        isOwn = false,
                                        username,
                                        delivered = true,
                                        read = false,
                                    }: IProps) {
    return (
        <div className={`mb-3 flex px-4 max-w-full ${isOwn ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`relative max-w-[75%] w-fit px-4 py-2 min-h-10 rounded-2xl flex gap-1 items-center ${
                    isOwn
                        ? 'bg-[#3980c9] text-white rounded-br-sm'
                        : 'bg-neutral-100 dark:bg-muted text-foreground rounded-bl-sm'
                }`}
            >
                <div className="text-sm break-all whitespace-pre-wrap">
                    {message}
                </div>

                <div className={`bottom-1 right-2 flex gap-1 text-xs justify-end items-end mt-auto ${
                    isOwn ? 'text-gray-300' : 'text-muted-foreground'
                }`}>
                    <span title={new Date(time).toLocaleString()}>{formatMessageTime(time)}</span>

                    {/*// TODO:*/}
                    {/*{isOwn && (*/}
                    {/*    read ? (*/}
                    {/*        <CheckCheck size={14} />*/}
                    {/*    ) : delivered ? (*/}
                    {/*        <Check size={14} />*/}
                    {/*    ) : null*/}
                    {/*)}*/}
                </div>
            </div>
        </div>
    )
}
