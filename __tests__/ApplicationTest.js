import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("문자열 계산기", () => {

  // 각 테스트 전마다 print 함수를 mock으로 초기화
  // 각 테스트 시작 전에 Console.print를 새로 리셋
  beforeEach(() => {
    MissionUtils.Console.print = jest.fn();
  });

  // 빈 문자열 입력시 0 반환
  test("빈 문자열 입력 시 0 반환", async () => {
    mockQuestions([""]);
    const app = new App();
    await app.run();
    expect(MissionUtils.Console.print).toHaveBeenCalledWith(expect.stringContaining("결과 : 0"));
  });

  // 구분자 없이 숫자만 입력한 경우
  test("구분자 없이 숫자만 입력한 경우", async () => {
    mockQuestions(["5"]);
    const app = new App();
    await app.run();
    expect(MissionUtils.Console.print).toHaveBeenCalledWith(expect.stringContaining("결과 : 5"));
  });

  // 쉼표, 구분자 사용한 경우
  test("쉼표 구분자 사용", async () => {
    mockQuestions(["1,2,3"]);
    const app = new App();
    await app.run();
    expect(MissionUtils.Console.print).toHaveBeenCalledWith(expect.stringContaining("결과 : 6"));
  });

  // 콜론 구분자 사용한 경우 
  test("콜론 구분자 사용", async () => {
    mockQuestions(["1:2:3"]);
    const app = new App();
    await app.run();
    expect(MissionUtils.Console.print).toHaveBeenCalledWith(expect.stringContaining("결과 : 6"));
  });

  // 쉼표와 콜론 혼합 사용한 경우 
  test("쉼표와 콜론 혼합 사용", async () => {
    mockQuestions(["1,2:3"]);
    const app = new App();
    await app.run();
    expect(MissionUtils.Console.print).toHaveBeenCalledWith(expect.stringContaining("결과 : 6"));
  });

  test("커스텀 구분자 사용", async () => {
    const inputs = ["//;\\n1"];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ["결과 : 1"];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test("예외 테스트", async () => {
    const inputs = ["-1,2,3"];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow("[ERROR]");
  }); 

  // 음수 입력 시 예외 발생한 경우
  test("음수 입력 시 예외 발생", async () => {
    mockQuestions(["-1,2,3"]);
    const app = new App();
    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  // 구분자 사이 빈 값이 있을 때 예외 발생한 경우
  test("구분자만 입력 시 예외 발생", async () => {
    mockQuestions([",,,"]);
    const app = new App();
    await expect(app.run()).rejects.toThrow("[ERROR]");
  });


});
