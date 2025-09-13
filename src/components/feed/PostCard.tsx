import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle, Share2, MessageSquareMore, Send, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useFriends } from "@/hooks/useFriends";
import { useComments } from "@/hooks/useComments";
import { formatDistanceToNow } from "date-fns";

export interface Post {
  id: string;
  author: string;
  initials: string;
  year: string;
  subtitle: string;
  text: string;
  media_urls?: string[] | null;
  author_id?: string;
}

export function PostCard({ post }: { post: Post }) {
  const [showFullText, setShowFullText] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const { friends } = useFriends();
  const { comments, loading: commentsLoading, createComment, deleteComment } = useComments(post.id);
  
  const isLongText = post.text.length > 200;
  const displayText = showFullText ? post.text : post.text.slice(0, 200);
  const hasMedia = post.media_urls && post.media_urls.length > 0;
  
  // Check if user is already connected to post author
  const isConnected = friends.some(friend => friend.id === post.author_id);
  
  const handleChatClick = () => {
    if (post.author_id && isConnected) {
      navigate(`/friends?chat=${post.author_id}`);
    }
  };
  
  const handleCommentClick = () => {
    setShowComments(!showComments);
  };

  const handleSubmitComment = async () => {
    if (!commentText.trim()) return;
    
    const result = await createComment(commentText);
    if (result) {
      setCommentText("");
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    await deleteComment(commentId);
  };

  return (
    <article className="mb-4">
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-5">
          <header className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback>{post.initials}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-semibold">{post.author}</div>
                <div className="text-xs text-muted-foreground">{post.year} • {post.subtitle}</div>
              </div>
            </div>
            {!isConnected && post.author_id !== user?.id && (
              <Button variant="outline" size="sm">Connect</Button>
            )}
          </header>

          <section className="mt-4 text-sm text-foreground">
            <p>
              {displayText}
              {isLongText && (
                <button 
                  onClick={() => setShowFullText(!showFullText)}
                  className="text-primary hover:underline ml-1"
                >
                  {showFullText ? 'see less' : 'see more'}
                </button>
              )}
            </p>
            {/* Media preview - only show if media exists */}
            {hasMedia && (
              <div className="mt-4 grid gap-2">
                {post.media_urls?.map((url, index) => (
                  <div key={index} className="rounded-xl overflow-hidden">
                    {url.includes('image') || url.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                      <img src={url} alt="Post media" className="w-full h-auto max-h-96 object-cover" />
                    ) : url.includes('video') || url.match(/\.(mp4|webm|ogg)$/i) ? (
                      <video controls className="w-full h-auto max-h-96">
                        <source src={url} />
                      </video>
                    ) : (
                      <a href={url} target="_blank" rel="noopener noreferrer" className="block p-4 bg-muted rounded-xl hover:bg-muted/80">
                        📎 View attachment
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          <div className="mt-4 grid grid-cols-3 divide-x rounded-lg border">
            <button 
              onClick={handleCommentClick}
              className="flex items-center justify-center gap-2 py-2 text-sm hover:bg-accent/70 transition-transform duration-200 ease-out hover:scale-[1.02]"
            >
              <MessageCircle size={18} /> Comment
            </button>
            <button className="flex items-center justify-center gap-2 py-2 text-sm hover:bg-accent/70 transition-transform duration-200 ease-out hover:scale-[1.02]">
              <Share2 size={18} /> Share
            </button>
            <button 
              onClick={handleChatClick}
              disabled={!isConnected || post.author_id === user?.id}
              className="flex items-center justify-center gap-2 py-2 text-sm hover:bg-accent/70 transition-transform duration-200 ease-out hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MessageSquareMore size={18} /> Chat
            </button>
          </div>

          {/* Show all comments button */}
          {comments.length > 0 && !showComments && (
            <div className="mt-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback>{comments[0]?.author?.full_name?.[0] || 'U'}</AvatarFallback>
                </Avatar>
                <span>{comments[0]?.author?.full_name}: "{comments[0]?.content.slice(0, 30)}..."</span>
                <button 
                  onClick={() => setShowComments(true)}
                  className="text-primary hover:underline ml-auto"
                >
                  Show all {comments.length} comment{comments.length !== 1 ? 's' : ''}
                </button>
              </div>
            </div>
          )}

          {/* Comment Section */}
          {showComments && (
            <div className="mt-4 space-y-3 border-t pt-4">
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{user?.user_metadata?.full_name?.[0] || 'U'}</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment()}
                    className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button 
                    size="sm" 
                    onClick={handleSubmitComment}
                    disabled={!commentText.trim()}
                  >
                    <Send size={16} />
                  </Button>
                </div>
              </div>
              
              {/* Comments List */}
              <div className="space-y-3">
                {commentsLoading ? (
                  <div className="text-sm text-muted-foreground text-center py-4">
                    Loading comments...
                  </div>
                ) : comments.length === 0 ? (
                  <div className="text-sm text-muted-foreground text-center py-4">
                    No comments yet. Be the first to comment!
                  </div>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{comment.author?.full_name?.[0] || 'U'}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-muted rounded-lg px-3 py-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{comment.author?.full_name}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                              </span>
                              {comment.author_id === user?.id && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleDeleteComment(comment.id)}
                                  className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                                >
                                  <Trash2 size={12} />
                                </Button>
                              )}
                            </div>
                          </div>
                          <p className="text-sm mt-1">{comment.content}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </article>
  );
}
