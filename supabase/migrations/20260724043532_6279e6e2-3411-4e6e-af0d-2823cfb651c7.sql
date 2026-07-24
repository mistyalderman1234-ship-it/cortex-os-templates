DROP POLICY IF EXISTS "Users can view their own objects" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own objects" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own objects" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own objects" ON storage.objects;
DROP POLICY IF EXISTS "Service role can manage all objects" ON storage.objects;

CREATE POLICY "Users can view their own objects"
ON storage.objects FOR SELECT
TO authenticated
USING (owner = auth.uid());

CREATE POLICY "Users can upload their own objects"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (owner = auth.uid());

CREATE POLICY "Users can update their own objects"
ON storage.objects FOR UPDATE
TO authenticated
USING (owner = auth.uid());

CREATE POLICY "Users can delete their own objects"
ON storage.objects FOR DELETE
TO authenticated
USING (owner = auth.uid());

CREATE POLICY "Service role can manage all objects"
ON storage.objects FOR ALL
TO service_role
USING (true)
WITH CHECK (true);