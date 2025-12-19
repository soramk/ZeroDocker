// --- DATA & STATE ---
const stepsData = [
    {
        id: 1,
        title: "Step 1: 「魔法のレシピ」を書く",
        subtitle: "(Dockerfile)",
        mission: "たった一つのファイルからWebサーバーを起動してみよう。",
        actions: [
            "Docker Desktopをインストール",
            "シンプルな index.html を作成",
            "Dockerfile を作成 (FROM nginx, COPY ...)"
        ],
        learnings: [
            "ベースイメージ (FROM) の概念",
            "ファイルコピー (COPY) の仕組み",
            "コマンド一発でサーバーが立ち上がる感動"
        ],
        skills: [20, 10, 5], // Infrastructure, Coding, AutomationS
        icon: "📄"
    },
    {
        id: 2,
        title: "Step 2: 「言語」を動かす",
        subtitle: "(App Container)",
        mission: "HTMLだけでなく、PythonやNode.jsなどのプログラムを動かす。",
        actions: [
            "Python (Flask) などで Hello World アプリ作成",
            "専用の Dockerfile を書く",
            "docker build & docker run コマンド実行"
        ],
        learnings: [
            "ライブラリのインストール (RUN pip install)",
            "ポートフォワード (PCとコンテナのポート接続)"
        ],
        skills: [35, 30, 10],
        icon: "🐍"
    },
    {
        id: 3,
        title: "Step 3: 「複数の箱」を連携",
        subtitle: "(Docker Compose)",
        mission: "最大の山場。アプリとDBを連携させて一発起動。",
        actions: [
            "Webアプリ + DB (PostgreSQL等) を用意",
            "docker-compose.yml を作成",
            "docker-compose up で起動"
        ],
        learnings: [
            "ファイル設定だけでシステム全体が立ち上がる快感",
            "コンテナ間通信 (アプリがDBを見つける仕組み)"
        ],
        skills: [60, 40, 20],
        icon: "🔗"
    },
    {
        id: 4,
        title: "Step 4: 開発環境ごと箱にする",
        subtitle: "(Dev Containers)",
        mission: "エディタの設定や拡張機能ごとコンテナに閉じ込める。",
        actions: [
            "VS Code拡張機能「Dev Containers」導入",
            ".devcontainer フォルダ作成",
            "コンテナ内でVS Codeを開く"
        ],
        learnings: [
            "チーム全員が同じ環境を一瞬で再現",
            "ローカル環境を汚さないクリーンな開発"
        ],
        skills: [70, 50, 40],
        icon: "💻"
    },
    {
        id: 5,
        title: "Step 5: 自動化の工場を作る",
        subtitle: "(CI/CD)",
        mission: "GitHubにプッシュしたら自動でコンテナが作られる仕組み。",
        actions: [
            "GitHubリポジトリ作成",
            "GitHub Actions 設定ファイル作成",
            "コードをPushして自動ビルド確認"
        ],
        learnings: [
            "「自分のPC以外」でも同じアプリが動く証明",
            "モダンな開発フロー (CI/CD) の基礎"
        ],
        skills: [90, 60, 90],
        icon: "🏭"
    }
];

let currentStepId = 1;
let skillChart = null;

// --- CONCEPT VISUALIZER LOGIC ---
function switchConcept(mode) {
    const display = document.getElementById('concept-display');
    const btnBefore = document.getElementById('btn-before');
    const btnAfter = document.getElementById('btn-after');

    if (mode === 'before') {
        // Style Buttons
        btnBefore.classList.add('bg-slate-600', 'text-white');
        btnBefore.classList.remove('bg-slate-100', 'text-slate-500');
        btnAfter.classList.add('bg-slate-100', 'text-slate-500');
        btnAfter.classList.remove('bg-blue-600', 'text-white');

        // Content
        display.innerHTML = `
            <div class="text-center md:w-1/2">
                <div class="text-4xl mb-4">🪑 👕 🍽️ 🚲</div>
                <h3 class="font-bold text-lg text-slate-700">バラバラの引っ越し</h3>
                <p class="text-sm text-slate-500 mt-2">家具や服を一つずつトラックへ。<br>「ネジが足りない！」「棚が入らない！」</p>
            </div>
            <div class="text-center md:w-1/2 bg-red-50 p-4 rounded-lg border border-red-100">
                <h4 class="font-bold text-red-600 mb-2">トラブル発生 ⚠️</h4>
                <ul class="text-sm text-left list-disc list-inside text-slate-700 space-y-1">
                    <li>手順が複雑で再現できない</li>
                    <li>本番環境と自分のPCで挙動が違う</li>
                    <li>依存関係の競合（ライブラリ地獄）</li>
                </ul>
            </div>
        `;
    } else {
        // Style Buttons
        btnBefore.classList.remove('bg-slate-600', 'text-white');
        btnBefore.classList.add('bg-slate-100', 'text-slate-500');
        btnAfter.classList.remove('bg-slate-100', 'text-slate-500');
        btnAfter.classList.add('bg-blue-600', 'text-white');

        // Content
        display.innerHTML = `
            <div class="text-center md:w-1/2">
                <div class="text-6xl mb-4 drop-shadow-md">📦</div>
                <h3 class="font-bold text-lg text-blue-700">コンテナ引っ越し</h3>
                <p class="text-sm text-slate-500 mt-2">部屋ごと巨大な箱に詰めてトラックへ。<br>どこでも「いつもの部屋」が開く。</p>
            </div>
            <div class="text-center md:w-1/2 bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h4 class="font-bold text-blue-600 mb-2">メリット ✨</h4>
                <ul class="text-sm text-left list-disc list-inside text-slate-700 space-y-1">
                    <li>Windows/Mac/Linux 全て同じ動き</li>
                    <li>環境構築コマンド一発</li>
                    <li>「動かない」トラブル激減</li>
                </ul>
            </div>
        `;
    }
}

// --- ROADMAP LOGIC ---
function renderNav() {
    const nav = document.getElementById('step-nav');
    nav.innerHTML = '';
    
    stepsData.forEach(step => {
        const btn = document.createElement('button');
        const isActive = step.id === currentStepId;
        
        btn.className = `flex items-center p-3 rounded-lg border text-left transition-all w-full min-w-[200px] lg:min-w-0 ${
            isActive ? 'step-active shadow-md ring-2 ring-blue-300' : 'step-inactive'
        }`;
        btn.onclick = () => setStep(step.id);
        
        btn.innerHTML = `
            <div class="text-xl mr-3">${step.icon}</div>
            <div>
                <div class="text-xs font-bold uppercase opacity-70">Step ${step.id}</div>
                <div class="text-sm font-semibold truncate">${step.subtitle}</div>
            </div>
        `;
        nav.appendChild(btn);
    });
}

function renderContent() {
    const container = document.getElementById('step-content');
    const data = stepsData.find(s => s.id === currentStepId);
    
    // Animate transition
    container.style.opacity = '0';
    
    setTimeout(() => {
        container.innerHTML = `
            <div>
                <div class="flex items-center mb-4">
                    <span class="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded mr-2">STEP ${data.id}</span>
                    <h3 class="text-2xl font-bold text-slate-800">${data.title}</h3>
                </div>
                <p class="text-lg text-slate-600 mb-6 bg-slate-50 p-4 rounded-lg border border-slate-100">
                    ${data.mission}
                </p>
                
                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="font-bold text-slate-700 border-b pb-2 mb-3">🛠️ やること</h4>
                        <ul class="space-y-3">
                            ${data.actions.map(act => `
                                <li class="flex items-start text-sm text-slate-600">
                                    <span class="text-blue-500 mr-2">✓</span> ${act}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-bold text-slate-700 border-b pb-2 mb-3">🧠 学ぶこと・成果</h4>
                        <ul class="space-y-3">
                            ${data.learnings.map(lrn => `
                                <li class="flex items-start text-sm text-slate-600">
                                    <span class="text-yellow-500 mr-2">★</span> ${lrn}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="mt-8 pt-4 border-t text-right">
                    ${data.id < 5 ? 
                    `<button onclick="setStep(${data.id + 1})" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-lg">
                        次のステップへ進む →
                    </button>` : 
                    `<div class="text-blue-600 font-bold">🎉 ロードマップ完了！開発を始めましょう。</div>`
                }
            </div>
        `;
        container.style.opacity = '1';
        container.style.transition = 'opacity 0.3s ease-in';
    }, 150);
}

function updateChart() {
    const data = stepsData.find(s => s.id === currentStepId);
    
    if (skillChart) {
        skillChart.data.datasets[0].data = data.skills;
        skillChart.update();
    } else {
        const ctx = document.getElementById('skillChart').getContext('2d');
        skillChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['インフラ構築力', 'コード理解力', '自動化・運用力'],
                datasets: [{
                    label: 'エンジニアスキル',
                    data: data.skills,
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        pointLabels: {
                            font: {
                                size: 11,
                                family: "'Noto Sans JP', sans-serif"
                            },
                            color: '#4b5563'
                        },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: {
                            stepSize: 20,
                            display: false 
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.raw + '%';
                            }
                        }
                    }
                }
            }
        });
    }
}

function setStep(id) {
    currentStepId = id;
    renderNav();
    renderContent();
    updateChart();
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    switchConcept('after'); // Default to "After" view
    setStep(1); // Start at Step 1
});
