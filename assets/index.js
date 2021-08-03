// Date 객체가 문자열로 변환될 때 적절한 한글 포맷으로 출력되도록 설정
Date.prototype.toString = function () {
	return [
		`${this.getFullYear()}년`,
		`${this.getMonth() + 1}월`,
		`${this.getDate()}일`,
		[
			`${String(this.getHours()).padStart(2, "0")}`,
			`${String(this.getMinutes()).padStart(2, "0")}`,
			`${String(this.getSeconds()).padStart(2, "0")}`,
		].join(":"),
	].join(" ");
};

// Vue 앱 생성
// Vue.js: Getting Started: https://kr.vuejs.org/v2/guide/index.html
const app = new Vue({
	el: "#app",
	data: {
		// 데이터가 로딩 완료되었는지 여부
		loaded: false,

		// json 파일들
		competitions: [],
		submissions: [],

		// 최상단에 띄울 연습 문제
		competition: {},
		// 연습에 대해 유저들이 푼 문제 수, 시도 횟수, 솔브 성공 등
		competitionDescription: [],
	},
	created() {
		this.load();
	},
	methods: {
		// 처음 페이지가 로드되었을 때 json 데이터 불러오기 및 initialize 작업
		async load() {
			// load all json files
			[this.competitions, this.submissions] = await Promise.all(
				["competitions.json", "submissions.json"].map(async filename => await (await fetch(filename)).json())
			);

			// manipulate incomplete fields in json data
			this.submissions.forEach(submission => {
				submission.when = new Date(submission.when);
			});
			this.competitions.forEach(competition => {
				competition.duration.begin = new Date(competition.duration.begin);
				competition.duration.end = new Date(competition.duration.end);
			});

			// 최상단에 띄울 연습 선정 (배열에서 가장 가까이 있는 연습)
			this.displayCompetition(this.competitions[this.competitions.length - 1]);

			// loaded를 true로 설정하여 화면에 데이터 뿌리기
			this.loaded = true;
		},

		// 제출 정보들과 문제가 주어지면 유저들의 솔브 성공, 시도 횟수를 정리해서 반환
		// submissions: [ submission, submission, ... ]
		// problems: [ int, int, ... ]
		describeSubmissions(submissions, problems = undefined) {
			const filter = problems !== undefined ? new Set(problems) : undefined;

			// [
			//   {
			//     username: $username,
			//     solvedCount: 0,
			//     $problemId: {
			//       solved: false,
			//       trial: 0
			//     }
			//   }
			// ]
			return Object.entries(
				submissions.reverse().reduce((users, submission) => {
					// skip if problem id is not in filter
					if (filter !== undefined && !filter.has(submission.problemId)) return users;

					const user =
						users[submission.username] ??
						(users[submission.username] = { username: submission.username, solvedCount: 0 });

					const problem = user[submission.problemId] ?? (user[submission.problemId] = { solved: false, trial: 0 });

					// trial will increase only when problem was not solved
					if (problem.solved === false) {
						if (submission.resultCode === "AC") {
							problem.solved = true;
							problem.trial += 1;
							user.solvedCount += 1;
						} else {
							problem.trial += 1;
						}
					}

					return users;
				}, {})
			)
				.map(([, userdata]) => userdata)
				.sort((a, b) => b.solvedCount - a.solvedCount);
		},

		// 주어진 연습을 최상단에 띄움
		displayCompetition(competition) {
			this.competition = competition;
			this.competitionDescription = this.describeSubmissions(
				this.getSubmissionsDuring(this.competition.duration),
				this.competition.problems
			);
		},

		// 주어진 기간에 해당되는 제출 반환
		// duration: { begin: Date, end: Date }
		getSubmissionsDuring(duration) {
			return this.submissions.filter(submission => {
				return duration.begin <= submission.when && submission.when <= duration.end;
			});
		},
	},
});
