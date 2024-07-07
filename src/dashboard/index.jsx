import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useAuth, useUser } from '@clerk/clerk-react';
import { Spinner } from 'flowbite-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
} from "lucide-react"
import { BsThreeDotsVertical } from "react-icons/bs";


function Dashboard() {
    const { user } = useUser();
    const [isResume, setIsResume] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState("");
    const [resumes, setResumes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [count, setCount] = useState(0);

    //fetching resumes from server
    useEffect(() => {
        setIsLoading(true);
        const fetchResume = async () => {
            try {
                const response = await fetch('/api/user/getresume', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress })
                });

                const dataRes = await response.json();
                if (response.ok) {
                    setResumes(dataRes.userResume)
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
                setCount(count + 1);
            }
        }
        //whenever user info is available (avoid double loading)
        user && fetchResume();
    }, [user])

    const handelClick = async () => {
        try {
            const res = await fetch('/api/user/resume', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: data, email: user?.primaryEmailAddress?.emailAddress })
            });
            if (res.ok) {
                setIsResume(true);
            }
            setShowModal(false);
            setResumes([...resumes, { title: data, email: user?.primaryEmailAddress?.emailAddress }]);
        } catch (e) {
            console.error(e);
            isResume(false);
        }
    }
    return (
        <div>
            <main>
                <h1 className='text-[48px] font-bold text-center'>
                    {
                        resumes.length !== 0 ? 'Your Resumes' : 'No Resumes'
                    }
                </h1>
                {
                    isLoading && (
                        <div className='fixed w-full h-full top-0 flex items-center justify-center opacity-100 bg-[#d6d1d19e] z-10'>
                            <Spinner />
                        </div>
                    )
                }

                <div className='flex flex-wrap'>
                    <div className='flex flex-wrap'>
                        {
                            resumes?.map((resume, i) => (
                                <div key={i} >
                                    <div className='lg:w-[18vw] lg:h-[32vh] h-[30vw] w-[30vw] rounded-lg border-2 border-dashed mx-10 mt-20 flex justify-center relative'>
                                        <div className='flex flex-col justify-center items-center gap-4'>
                                            <h1 className='text-2xl font-bold'>{resume.title}</h1>
                                            <Button>View</Button>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>

                                                <Button className='bg-transparent absolute mix-blend-difference rounded-full bottom-4 right-4 hover:bg-transparent'><BsThreeDotsVertical size={30} className='border-[0.5px] border-black rounded-full hover:bg-stone-800 scale-125 p-1' /></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuGroup>
                                                    <DropdownMenuItem>
                                                        <User className="mr-2 h-4 w-4" />
                                                        <span>Delete</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <CreditCard className="mr-2 h-4 w-4" />
                                                        <span>Edit</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Settings className="mr-2 h-4 w-4" />
                                                        <span>Settings</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            ))
                        }
                        <div className='lg:w-[18vw] lg:h-[32vh] h-[30vw] w-[30vw] rounded-lg border-2 border-dashed mx-10 mt-20 flex justify-center'>
                            <div className='flex flex-col justify-center items-center gap-4' onClick={() => {
                                setShowModal(true)
                            }}>
                                <Button>Create New +</Button>
                            </div>
                        </div>
                    </div>
                </div >



                {
                    showModal && (
                        <div className='fixed w-full h-full top-0 flex items-center opacity-100 bg-[#5351519e] z-10'>
                            <Card className="w-[350px] mx-auto opacity-0=100 z-20">
                                <CardHeader>
                                    <CardTitle>Create Resume</CardTitle>
                                    <CardDescription>Create your new resume in one-click.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form>
                                        <div className="grid w-full items-center gap-4">
                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="name">Title</Label>
                                                <Input id="name" placeholder="Name of your project" onChange={(e) => setData(e.target.value)} />
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="framework">Genre</Label>
                                                <Select>
                                                    <SelectTrigger id="framework">
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                    <SelectContent position="popper">
                                                        <SelectItem value="next">Technial Based</SelectItem>
                                                        <SelectItem value="sveltekit">Management Based</SelectItem>
                                                        <SelectItem value="astro">Creative Based</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </form>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
                                    <Button onClick={handelClick}>{'Create'}</Button>
                                </CardFooter>
                            </Card>
                        </div>
                    )
                }
            </main >
        </div >
    )
}

export default Dashboard
