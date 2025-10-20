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
      
    }
}

export default App;
