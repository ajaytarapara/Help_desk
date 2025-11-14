--EXTRACT(EPOCH FROM <timestamp>) function is used to convert a timestamp or an interval into the number of seconds
CREATE OR REPLACE FUNCTION get_agent_avg_resolution_time(agentId INT)
RETURNS NUMERIC
AS $$
DECLARE 
    avg_time NUMERIC := 0;
BEGIN
    SELECT 
        COALESCE(ROUND(AVG(EXTRACT(EPOCH FROM (t."ClosedDate" - t."AssignedDate")) / 3600), 2), 0)
    INTO avg_time
    FROM "Tickets" t
    WHERE t."ClosedDate" IS NOT NULL
      AND t."AssignedDate" IS NOT NULL
      AND t."AssignedToId" = agentId;

    RETURN avg_time;
END;
$$
LANGUAGE plpgsql;


