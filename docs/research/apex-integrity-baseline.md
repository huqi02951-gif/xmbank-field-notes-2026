# APEX 完整性基线

记录时间：2026-07-08T20:41:07+0800  
审计模式：只读；未安装、未格式化、未构建、未生成文件、未暂存、未提交。

## Git 基线

- HEAD：`1aa4375c7bf88518e309fcbe636158cd67bf31f8`
- 开始 `status --porcelain`：

```text
 M AGENTS.md
 M CLAUDE.md
```

- 审计结束前 `status --porcelain`：

```text
 M AGENTS.md
 M CLAUDE.md
```

两次结果一致。上述两项是审计开始前已存在的用户修改；本次没有清理、覆盖、暂存或提交。

## 关键源文件 Git blob

| 文件（APEX 仓库相对路径） | HEAD blob |
|---|---|
| `package.json` | `0ed1c4d518b374c8ce1655746b8989e8fe13de54` |
| `vite.config.ts` | `3afc641fe7242efde184fe78f5bc5f30b91837b7` |
| `data/checklistData.ts` | `03ac59aa93329decf2c97ed77265c9a96dc95de8` |
| `components/MaterialChecklistCenter.tsx` | `2f078f94038102f73fed6afb4c57f09bff2c8aa8` |
| `components/tools/SensitiveCommAssistant.tsx` | `2841c885fcc25183a673ec1a911e4d4db9ac2e3d` |
| `components/tools/checklist-generator/logic.ts` | `b66d15ae063dda5ef0790f1b1eb4f293fecd8fc3` |
| `components/shared/ActionBar.tsx` | `e91c3f4d1fda3141bf3a42484cc04af60dbab1da` |
| `lib/localDB.ts` | `6a4cbdc91ec7dd5663849824e171ff325ec17c66` |
| `lib/CustomerContext.tsx` | `66fdbaaadb8834f17fdae61e6662bd5c49d706a5` |

## 允许与禁止的审计动作

已执行：读取已跟踪文件、`git grep` / `rg` 搜索、`git log`、`git rev-parse`、`git status --porcelain`、列目录。  
未执行：包管理器、构建、格式化、测试、生成器、开发服务器、数据库命令、Git 写操作、APEX 文件写入。

## 最终核验要求

主流程在部署前应再次运行以下只读检查，并与本页基线比较：

```sh
git -C "$APEX_SOURCE_ROOT" rev-parse HEAD
git -C "$APEX_SOURCE_ROOT" status --porcelain
```

预期 HEAD 仍为上值，状态仍仅有基线中的两个既有修改。若状态出现其他路径，应停止部署并调查；不要自动还原或清理。

