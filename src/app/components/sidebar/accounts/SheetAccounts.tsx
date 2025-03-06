import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Icon} from "@iconify/react";
import SheetAccount from "@/app/components/sidebar/accounts/SheetAccount";
import {useUserStore} from "@/app/stores/user";


export default function SheetAccounts() {
    const currentUser = useUserStore(state => state.user);
    const getInitials = (user: any) => {
        const { first_name, last_name, username, email } = user;
        if(!first_name && !last_name && !username && !email) return "null";
        if (first_name) return `${first_name[0]}${last_name ? last_name[0] : ""}`.toUpperCase();
        return (username || email )[0].toUpperCase();
    };

    return(
        <>
            <div className="accounts">
                {/*{JSON.stringify(currentUser)}*/}
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1" className={"px-2"}>
                        <AccordionTrigger className={"cursor-pointer flex"}>
                            <div className="flex gap-2 items-center">
                                <Avatar className={"w-12 h-12"}>
                                    <AvatarImage
                                        src="https://github.com/shaddcn.png"/>
                                    <AvatarFallback className={"border border-muted-foreground"}>
                                        {getInitials(currentUser)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <span>{currentUser.first_name ? `${currentUser.first_name} ${currentUser.last_name || ""}`.trim() : currentUser.username || currentUser.email}</span>
                                    <span className={"text-muted-foreground"}>{currentUser.phone_number || ""}</span>
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className={"flex flex-col"}>
                            <SheetAccount current user_id={1} />
                            <SheetAccount user_id={2} />
                            <SheetAccount user_id={3} />
                            <SheetAccount user_id={4} />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </>
    )
}