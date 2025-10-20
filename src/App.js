import { Console } from "@woowacourse/mission-utils";

class App {
  async run() { 
    // 전체 프로그램 실행을 담당
    try{
      // 1. 사용자로부터 문자열 입력 받기
      const input = await Console.readLineAsync("덧셈할 문자열을 입력해주세요.");
      // 입력값의 공백 제거 후 계산 수행
      const result = this.calculate(input.trim());

      // 4. 결과 출력
      Console.print(`결과 : ${result}`);
    } catch(error){
      // 에러 발생 시 메시지 출력 후 프로그램 종료
      Console.print(error.message);
      throw error;
    }
  }
  // 문자열 덧셈 계산기 메서드
  calculate(input) {
    // 1-1. 빈 문자열 입력 시 0 반환
      if (input === "") {
        return 0;
      }
      // 숫자를 저장할 배열
      let real_numbers = [];

      // 1-2. 빈 문자열이 아닌 경우
      // (1) 커스텀 구분자로 지정한 경우
      if (input.slice(0, 2) === "//") {
        // 커스텀 구분자와 숫자 부분 분리
        const parts = input.split(/\\n|\n/);

        // 형식 오류인 경우
        if (parts.length < 2) {
          throw new Error("[ERROR] 잘못된 입력 형식입니다.");
        }

        // 커스텀 구분자 추출
        const delimeter = parts[0].slice(2);

        // 구분자가 두 글자 이상인 경우
        if (delimeter.length > 1) {
          throw new Error("[ERROR] 구분자가 2개 이상 지정되었습니다.");
        }

        // 구분자를 기준으로 숫자 분리
        const numbers = parts[1].split(delimeter);

        // 3. 예외 처리: 빈 값, 숫자 아님, 음수 입력
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

        // 문자열을 숫자로 변환해 배열에 저장
        for (let i = 0; i < numbers.length; i++) {
          real_numbers.push(Number(numbers[i]));
        }
      }

      // 1-2. 빈 문자열이 아닌 경우
      // (2) 기본 구분자 사용한 경우
      else {
        // 정규 표현식 사용해서 쉼표(,) 또는 콜론(:) 기준으로 문자열 분리
        let numbers = input.split(/,|:/);

        // 문자열을 숫자로 변환
        for (let i = 0; i < numbers.length; i++) {
          real_numbers.push(Number(numbers[i]));
        }        

        // 3. 예외 처리: 빈 값, 숫자 아님, 음수 입력
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

      // 합 계산
      let sum = 0;
      for (let i = 0; i < real_numbers.length; i++) {
        sum += real_numbers[i];
      }

      // 결과 반환
      return sum;
    }
}

export default App;
