export async function onRequestPost(context) {
    try {
        // 1. 获取前端传来的数据
        const { name, content } = await context.request.json();

        // 2. 从环境变量读取 Gitee Token
        const GITEE_TOKEN = context.env.GITEE_TOKEN;
        const GITEE_OWNER = '天冰羽影';
        const GITEE_REPO = 'message-board';

        // 3. 调用 Gitee API 创建 Issue
        const response= await fetch(
            `https://gitee.com/api/v5/repos/${GITEE_OWNER}/${GITEE_REPO}/issues`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `token ${GITEE_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: `来自 ${name} 的留言`,
                    body: content,
                })
            }
        );

        const result = await response.json();

        if (response.ok) {
            return new Response(JSON.stringify({ success: true, data: result }), {
                headers: { 'Content-Type': 'application/json' }
            });
        } else {
            return new Response(JSON.stringify({ success: false, error: result }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}