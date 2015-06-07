---
---     SCHEMA
---

-- QA's
DROP TABLE IF EXISTS qas;
CREATE TABLE qas (
    id              INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    qid             INTEGER NOT NULL,
    name            TEXT,
    length          DECIMAL,
    status          INTEGER NOT NULL,
    created         TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6),
    modified        TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
