import { Console } from "@woowacourse/mission-utils";

class App {
  async run() { 
    // 전체 프로그램 실행을 담당
    try{
      // 1. 프로그램 실행 함수(run)에서 문자열을 입력받는다.
      const input = await Console.readLineAsync("덧셈할 문자열을 입력해주세요.");
      // 입력값의 공백 제거 후 calculate 함수 수행
      const result = this.calculate(input.trim());

      // 5. 합산된 결과를 출력한다.
      Console.print(`결과 : ${result}`);
    } catch(error){
      // 에러 발생 시 메시지 출력 후 프로그램 종료
      Console.print(error.message);
      throw error;
    }
  }
  // 2. 입력값을 처리하기 위한 계산 함수(calculate)를 호출한다.
  calculate(input) {
    // 2-1. 빈 문자열을 입력 받은 경우 0 반환
      if (input === "") {
        return 0;
      }

      // 숫자를 저장할 배열
      let real_numbers = [];

      // 2-2. 빈 문자열이 아닌 경우
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

        // 구분자로 입력이 끝나는 경우
        if(parts[1].endsWith(delimeter)){
          throw new Error("[ERROR] 구분자로 입력이 끝날 수 없습니다.");
        }

        // 구분자가 두 글자 이상인 경우
        if (delimeter.length > 1) {
          throw new Error("[ERROR] 구분자가 2개 이상 지정되었습니다.");
        }

        // 숫자와 구분자의 순서가 잘못된 경우
        if (!/^[0-9]/.test(parts[1])) {
          throw new Error("[ERROR] 숫자와 구분자의 순서가 잘못되었습니다.");
        }

        // 구분자를 기준으로 숫자 분리
        const numbers = parts[1].split(delimeter);

        // 3. 예외 검증: 빈 값, 숫자 아님, 음수 입력
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

      // 2-2. 빈 문자열이 아닌 경우
      // (2) 기본 구분자 사용한 경우
      else {

        // 지정된 구분자가 아닌 경우
        if (!input.includes(",") && !input.includes(":")) {
          throw new Error("[ERROR] 지정된 구분자가 아닙니다.");
        }

        // 숫자와 구분자의 순서가 잘못된 경우
        if (!/^[0-9]/.test(input)) {
          throw new Error("[ERROR] 숫자와 구분자의 순서가 잘못되었습니다.");
        }

        // 구분자로 입력이 끝나는 경우
        if(input.endsWith(',') || input.endsWith(":")){
          throw new Error("[ERROR] 구분자로 입력이 끝날 수 없습니다.");
        }

        // 정규 표현식 사용해서 쉼표(,) 또는 콜론(:) 기준으로 문자열 분리
        let numbers = input.split(/,|:/);


        // 문자열을 숫자로 변환
        for (let i = 0; i < numbers.length; i++) {
          real_numbers.push(Number(numbers[i]));
        }        

        // 3. 예외 검증: 빈 값, 숫자 아님, 음수 입력
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

      // 4. 검증이 완료된 숫자들을 모두 더한다.
      let sum = 0;
      for (let i = 0; i < real_numbers.length; i++) {
        sum += real_numbers[i];
      }

      // 결과 반환
      return sum;
    }
}

export default App;
