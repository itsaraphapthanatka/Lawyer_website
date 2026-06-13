import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Newspaper } from 'lucide-react';
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
    if (image.startsWith('http')) return image;
    // Bare backend path (legacy "/uploads/x") needs the API prefix. Values that
    // are already absolute ("/api/uploads/...", "/images/...") are used as-is to
    // avoid a double "/api/api/..." prefix.
    if (image.startsWith('/uploads/')) return `${API_BASE_URL}${image}`;
    return image;
};

const BlogsPage = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const loadBlogs = async () => {
            try {
                const data = await fetchApi<Blog[]>('/blogs');
                setBlogs(data.filter((b) => b.published));
            } catch (error) {
                console.error('Failed to load blogs:', error);
            }
        };
        loadBlogs();
    }, []);

    return (
        <div className="min-h-screen bg-dark">
            <Navigation />

            <main className="pt-32 pb-24">
                {/* Header Section */}
                <div className="relative mb-20 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/40 via-transparent to-transparent opacity-50" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <button
                            onClick={() => navigate('/')}
                            className="inline-flex items-center gap-2 text-secondary hover:text-white transition-colors mb-12 font-bold uppercase tracking-widest text-sm"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            กลับสู่หน้าหลัก
                        </button>
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                            บทความและข่าวสาร <br />
                            <span className="text-secondary">ความรู้ทางกฎหมาย</span>
                        </h1>
                        <p className="text-gray-400 text-xl max-w-3xl leading-relaxed">
                            รวมบทความ ข้อกฎหมาย และข่าวสารที่น่าสนใจจากทีมทนายความของเรา เพื่อให้ท่านเข้าใจสิทธิและหน้าที่ทางกฎหมายได้ง่ายยิ่งขึ้น
                        </p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {blogs.length === 0 ? (
                        <div className="text-center py-24">
                            <Newspaper className="w-16 h-16 text-secondary/40 mx-auto mb-6" />
                            <p className="text-gray-400 text-lg">ยังไม่มีบทความในขณะนี้ โปรดติดตามเร็วๆ นี้</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.map((blog) => (
                                <article
                                    key={blog.id}
                                    onClick={() => navigate(`/blogs/${blog.id}`)}
                                    className="flex flex-col rounded-3xl bg-secondary/5 border border-white/5 overflow-hidden group hover:border-secondary/30 transition-all duration-500 cursor-pointer"
                                >
                                    <div className="aspect-[16/10] overflow-hidden bg-primary/30">
                                        {blog.image ? (
                                            <img
                                                src={resolveImage(blog.image)}
                                                alt={blog.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Newspaper className="w-12 h-12 text-secondary/40" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col flex-1 p-7">
                                        <div className="flex items-center gap-3 mb-4 text-xs text-gray-400">
                                            {blog.category && (
                                                <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary font-bold uppercase tracking-wider">
                                                    {blog.category}
                                                </span>
                                            )}
                                            <span className="inline-flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {formatDate(blog.createdAt)}
                                            </span>
                                        </div>
                                        <h2 className="text-xl font-serif font-bold text-white mb-3 leading-snug group-hover:text-secondary transition-colors line-clamp-2">
                                            {blog.title}
                                        </h2>
                                        <p className="text-gray-400 leading-relaxed line-clamp-3 mb-6 flex-1">
                                            {blog.excerpt}
                                        </p>
                                        <span className="inline-flex items-center gap-2 text-secondary font-bold text-sm group-hover:gap-3 transition-all">
                                            อ่านต่อ
                                            <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default BlogsPage;
