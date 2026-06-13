import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { fetchApi, API_BASE_URL } from '@/lib/api';

interface Blog {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    image?: string;
    author?: string;
    category?: string;
    published: boolean;
    createdAt: string;
}

const formatDate = (value: string) =>
    new Date(value).toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

const resolveImage = (image?: string) => {
    if (!image) return '';
    return image.startsWith('http') ? image : `${API_BASE_URL}${image}`;
};

const BlogDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!id) return;
        const loadBlog = async () => {
            try {
                const data = await fetchApi<Blog>(`/blogs/${id}`);
                setBlog(data);
            } catch (error) {
                console.error('Failed to load blog:', error);
                setNotFound(true);
            } finally {
                setIsLoading(false);
            }
        };
        loadBlog();
    }, [id]);

    return (
        <div className="min-h-screen bg-dark">
            <Navigation />

            <main className="pt-32 pb-24">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <button
                        onClick={() => navigate('/blogs')}
                        className="inline-flex items-center gap-2 text-secondary hover:text-white transition-colors mb-12 font-bold uppercase tracking-widest text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        กลับสู่บทความทั้งหมด
                    </button>

                    {isLoading ? (
                        <p className="text-gray-400">กำลังโหลด...</p>
                    ) : notFound || !blog ? (
                        <p className="text-gray-400">ไม่พบบทความที่ท่านต้องการ</p>
                    ) : (
                        <article>
                            <div className="flex items-center gap-4 mb-6 text-sm text-gray-400">
                                {blog.category && (
                                    <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary font-bold uppercase tracking-wider">
                                        {blog.category}
                                    </span>
                                )}
                                <span className="inline-flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4" />
                                    {formatDate(blog.createdAt)}
                                </span>
                                {blog.author && (
                                    <span className="inline-flex items-center gap-1.5">
                                        <User className="w-4 h-4" />
                                        {blog.author}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-8 leading-tight">
                                {blog.title}
                            </h1>

                            {blog.image && (
                                <div className="rounded-3xl overflow-hidden mb-10 border border-white/5">
                                    <img
                                        src={resolveImage(blog.image)}
                                        alt={blog.title}
                                        className="w-full object-cover"
                                    />
                                </div>
                            )}

                            <p className="text-xl text-gray-300 leading-relaxed mb-8 font-medium">
                                {blog.excerpt}
                            </p>

                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed whitespace-pre-line text-lg">
                                {blog.content}
                            </div>
                        </article>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default BlogDetailPage;
