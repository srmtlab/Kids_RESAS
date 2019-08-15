<nav class="navbar navbar-expand-lg navbar-dark bg-success">
    <a class="navbar-brand" href="{{route('home')}}">{{ config('app.name') }}</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            @if (Auth::check())
                <li class="nav-item">
                    <a class="nav-link" href="#">教室作成</a>
                </li>
            @endif
        </ul>
        <ul class="navbar-nav">
            @if (Auth::guest())
                <li class="nav-item"><a class="nav-link" href="{{ route('register') }}">ユーザー登録</a></li>
                <li class="nav-item"><a class="nav-link" href="{{ route('login') }}">ログイン</a></li>
            @else
                <li class="nav-item"><span class="navvar-text font-weight-bold">{{ Auth::user()->name }}</span></li>
                <li class="nav-item"><a class="nav-link" href="#">プロフィール編集</a></li>
                <li class="nav-item"><a class="nav-link" href="javascript:document.getElementById('logout-form').submit();">
                        ログアウト
                    </a></li>
                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                    {{ csrf_field() }}
                </form>
            @endif
        </ul>
    </div>
</nav>