import { JunitTransformer } from "../../src/transformer/junit";
import { LintResult } from "../../src/lint-result";
import * as fs from "fs";

test("transformEslint", async () => {
    const text = fs.readFileSync("data/junit_eslint.xml", "utf-8");
    const transformer = new JunitTransformer();
    const result = transformer.parse(text);

    expect(result.length).toBe(3);
    expect(result[0]).toMatchObject({
        path: "filepath.txt",
        rule: "@typescript-eslint/no-unused-vars",
        message: "'method' is defined but never used.",
        startLine: 1,
        endLine: undefined,
        startColumn: undefined,
        endColumn: undefined,
        level: "warning",
    } as LintResult);
    expect(result[1]).toMatchObject({
        path: "filepath.txt",
        rule: "prettier/prettier",
        message: "Insert `·`",
        startLine: 1,
        endLine: undefined,
        startColumn: undefined,
        endColumn: undefined,
        level: "warning",
    } as LintResult);
    expect(result[2]).toMatchObject({
        path: "filepath.txt",
        rule: "@typescript-eslint/no-unused-vars",
        message: "'a' is assigned a value but never used.",
        startLine: 2,
        endLine: undefined,
        startColumn: undefined,
        endColumn: undefined,
        level: "warning",
    } as LintResult);
});