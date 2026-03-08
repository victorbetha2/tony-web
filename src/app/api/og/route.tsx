import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const title = searchParams.get('title') || 'Construye tu libertad financiera';
        const category = searchParams.get('category') || 'T2B Team';

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        backgroundImage: 'linear-gradient(to bottom right, #0B0B0B, #171717)',
                        padding: '80px',
                    }}
                >
                    {/* Decorative background glow */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '-100px',
                            right: '-100px',
                            width: '600px',
                            height: '600px',
                            background: 'radial-gradient(circle, rgba(2,132,199,0.3) 0%, rgba(11,11,11,0) 70%)',
                        }}
                    />

                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(2, 132, 199, 0.2)',
                            border: '1px solid rgba(2, 132, 199, 0.4)',
                            color: '#0284c7',
                            padding: '8px 24px',
                            borderRadius: '999px',
                            fontSize: 24,
                            fontWeight: 600,
                            fontFamily: 'sans-serif',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                        }}
                    >
                        {category}
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            maxWidth: '900px',
                        }}
                    >
                        <h1
                            style={{
                                fontSize: 72,
                                fontWeight: 800,
                                color: 'white',
                                lineHeight: 1.1,
                                fontFamily: 'sans-serif',
                                margin: 0,
                            }}
                        >
                            {title}
                        </h1>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            borderTop: '2px solid rgba(255, 255, 255, 0.1)',
                            paddingTop: '40px',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <div
                                style={{
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: '32px',
                                    background: 'linear-gradient(45deg, #0284c7, #171717)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                }}
                            >
                                T2B
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: 32, fontWeight: 700, color: 'white', fontFamily: 'sans-serif' }}>
                                    T2B Team
                                </span>
                                <span style={{ fontSize: 24, color: '#9CA3AF', fontFamily: 'sans-serif' }}>
                                    t2bteam.net
                                </span>
                            </div>
                        </div>

                        {/* Logo/Brand Mark */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: 48, fontWeight: 800, color: 'white', fontFamily: 'sans-serif' }}>T2B</span>
                            <span style={{ fontSize: 48, fontWeight: 800, color: '#0284c7', fontFamily: 'sans-serif' }}>Team</span>
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.log(`${e.message}`);
        } else {
            console.log(e);
        }
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
