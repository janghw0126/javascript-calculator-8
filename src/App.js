import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    // 예외인 경우를 대비해서 try-catch 구조 사용
    try{
      // 문자열 입력받기
      const input = await Console.readLineAsync("덧셈할 문자열을 입력해주세요.");
      // 결과 result 변수 선언
      const result = this.calculate(input.trim());
      // 결과 출력
      Console.print(`결과 : ${result}`);} catch(error){
            Console.print(error.message);
            throw error;
          }
        }
    // 계산기 함수 선언하기
  calculate(input) {
    // 1-1. 빈 문자열을 입력받은 경우
      if (input === "") {
        return 0;
      }
      // 숫자 담을 배열
      let real_numbers = [];

      // 1-2. 빈 문자열이 아닌 경우
      // (1) 커스텀 구분자로 지정한 경우
      if (input.slice(0, 2) === "//") {
        // 커스텀 구분자를 기준으로 나누기
        const parts = input.split(/\\n|\n/);
        // 커스텀 구분자를 잘못 사용한 경우
        if (parts.length < 2) {
          throw new Error("[ERROR] 잘못된 입력 형식입니다.");
        }

        // 구분자 선언
        const delimeter = parts[0].slice(2);

        // 구분자가 두 개 이상인 경우
        if (delimeter.length > 1) {
          throw new Error("[ERROR] 구분자가 2개 이상 지정되었습니다.");
        }

        // 입력받는 값들 선언
        const numbers = parts[1].split(delimeter);

        // 숫자가 아닌 문자를 입력받을 경우
        for (let i = 0; i < numbers.length; i++) {
          if (numbers[i] === "") {
            throw new Error("[ERROR] 빈 값이 있습니다.");
          }
          if (isNaN(numbers[i])) {
            throw new Error("[ERROR] 입력받은 값은 숫자가 아닌 문자입니다.");
          }
          if (Number(numbers[i]) < 0) {
            throw new Error("[ERROR] 입력받은 값은 음수입니다.");
          }
        }

        // 숫자로 바꾸기
        for (let i = 0; i < numbers.length; i++) {
          real_numbers.push(Number(numbers[i]));
        }
      }
      // (2) 기본 구분자 사용한 경우
      else {
        // 정규 표현식!!! 싱기해 사용해서 문자열 쪼개기
        let numbers = input.split(/,|:/);

        // 숫자로 바꾸기
        for (let i = 0; i < numbers.length; i++) {
          real_numbers.push(Number(numbers[i]));
        }

        // 숫자가 아닌 문자를 입력받을 경우
        for (let i = 0; i < numbers.length; i++) {
          if (numbers[i] === "") {
            throw new Error("[ERROR] 빈 값이 있습니다.");
          }
          if (isNaN(numbers[i])) {
            throw new Error("[ERROR] 입력받은 값은 숫자가 아닌 문자입니다.");
          }
          if (Number(numbers[i]) < 0) {
            throw new Error("[ERROR] 입력받은 값은 음수입니다.");
          }
        }
      }

      
    }
}

export default App;
