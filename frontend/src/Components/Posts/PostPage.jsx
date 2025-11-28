import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../Header";
import { AiOutlineEye, AiOutlineClockCircle, AiOutlineCalendar, AiOutlineUser } from "react-icons/ai";

export default function PostPage() {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/posts/getposts?slug=${postSlug}`);
                const data = await res.json();
                if (!res.ok) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                if (res.ok) {
                    setPost(data.posts[0]);
                    setLoading(false);
                    setError(false);
                }
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchPost();
    }, [postSlug]);

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-slate-950">
                <Spinner size="xl" />
            </div>
        );

    if (error) return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-slate-950">
            <p className="text-xl text-red-500">Something went wrong!</p>
        </div>
    );

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-200 font-sans">
            <Header />

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Breadcrumbs */}
                <nav className="flex text-sm text-gray-500 dark:text-gray-400 mb-6" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link to="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                                Home
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <span className="mx-2">/</span>
                                <span className="text-gray-400 dark:text-gray-500 truncate max-w-[200px] sm:max-w-md">
                                    {post && post.postTitle}
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-4">
                    <Link to={`/search?category=${post && post.category}`}>
                        <span className="bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide hover:bg-gray-300 dark:hover:bg-slate-700 transition-colors">
                            {post && post.category}
                        </span>
                    </Link>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                    {post && post.postTitle}
                </h1>

                {/* Post Description / Excerpt (Optional, if available in data) */}
                {/* <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 font-light">
                    Finance is defined as the management of money and includes activities such as investing, borrowing, lending, budgeting, saving, and forecasting.
                </p> */}

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-8 border-b border-gray-200 dark:border-gray-800 pb-8">
                    <div className="flex items-center gap-2">
                        <AiOutlineUser className="w-4 h-4" />
                        <span className="font-medium text-gray-900 dark:text-gray-200">{post && post.auther || "Anonymous"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <AiOutlineCalendar className="w-4 h-4" />
                        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <AiOutlineClockCircle className="w-4 h-4" />
                        <span>{post && (post.postDescription.length / 1000).toFixed(0)} min read</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <AiOutlineEye className="w-4 h-4" />
                        <span>{post && post.views || 0} views</span>
                    </div>
                </div>

                {/* Advertisement Placeholder */}
                <div className="w-full bg-gray-200 dark:bg-slate-900 rounded-lg p-8 mb-10 flex flex-col items-center justify-center text-center border border-gray-300 dark:border-gray-800">
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Advertisement</span>
                    <span className="text-xs text-gray-400 dark:text-gray-600">(leaderboard slot)</span>
                </div>

                {/* Featured Image */}
                <img
                    src={post && post.thumbnail}
                    alt={post && post.postTitle}
                    className="w-full h-auto max-h-[600px] object-cover rounded-lg shadow-lg mb-10"
                />

                {/* Content */}
                <div
                    className="prose prose-lg dark:prose-invert max-w-none 
                    prose-headings:font-serif prose-headings:font-bold 
                    prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:text-indigo-500
                    prose-img:rounded-lg"
                    dangerouslySetInnerHTML={{ __html: post && post.postDescription }}
                ></div>
            </div>
        </main>
    );
}
